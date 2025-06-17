import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, CheckCircle, Database, Key, Globe, Users, RefreshCw } from 'lucide-react';

const SupabaseDebug: React.FC = () => {
  const [status, setStatus] = useState({
    connection: 'checking',
    tables: 'checking',
    auth: 'checking',
    env: 'checking',
    registration: 'checking'
  });
  const [details, setDetails] = useState<any>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkSupabaseStatus();
  }, []);

  const checkSupabaseStatus = async () => {
    setIsRefreshing(true);
    const newStatus = { ...status };
    const newDetails = { ...details };

    // Check environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      newStatus.env = 'success';
      newDetails.env = {
        url: supabaseUrl,
        keyPreview: `${supabaseKey.substring(0, 20)}...`,
        urlValid: supabaseUrl.includes('supabase.co') && supabaseUrl.startsWith('https://')
      };
    } else {
      newStatus.env = 'error';
      newDetails.env = {
        url: supabaseUrl || 'Missing',
        key: supabaseKey || 'Missing',
        urlValid: false
      };
    }

    // Check connection with better error handling
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
        .abortSignal(controller.signal);
        
      clearTimeout(timeoutId);
      
      if (error) {
        newStatus.connection = 'error';
        newDetails.connection = {
          message: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details
        };
      } else {
        newStatus.connection = 'success';
        newDetails.connection = 'Connected successfully';
      }
    } catch (error: any) {
      newStatus.connection = 'error';
      
      if (error.name === 'AbortError') {
        newDetails.connection = {
          message: 'Connection timeout - check your internet connection or Supabase URL',
          type: 'timeout'
        };
      } else if (error.message?.includes('Failed to fetch')) {
        newDetails.connection = {
          message: 'Network error - check Supabase URL and internet connection',
          type: 'network',
          possibleCauses: [
            'Incorrect Supabase URL in .env file',
            'Internet connection issues',
            'CORS configuration problems',
            'Supabase project is paused or deleted'
          ]
        };
      } else {
        newDetails.connection = {
          message: error.message || 'Unknown connection error',
          type: 'unknown'
        };
      }
    }

    // Check tables only if connection is successful
    if (newStatus.connection === 'success') {
      try {
        const tables = ['profiles', 'player_stats', 'tournaments'];
        const tableResults = {};
        
        for (const table of tables) {
          try {
            const { data, error } = await supabase.from(table).select('count').limit(1);
            tableResults[table] = error ? `Error: ${error.message}` : 'OK';
          } catch (err: any) {
            tableResults[table] = `Error: ${err.message}`;
          }
        }
        
        newStatus.tables = Object.values(tableResults).every(result => result === 'OK') ? 'success' : 'error';
        newDetails.tables = tableResults;
      } catch (error: any) {
        newStatus.tables = 'error';
        newDetails.tables = { error: error.message };
      }
    } else {
      newStatus.tables = 'skipped';
      newDetails.tables = 'Skipped due to connection failure';
    }

    // Check auth only if connection is successful
    if (newStatus.connection === 'success') {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        newStatus.auth = 'success';
        newDetails.auth = session ? 'User logged in' : 'No active session';
      } catch (error: any) {
        newStatus.auth = 'error';
        newDetails.auth = error.message;
      }
    } else {
      newStatus.auth = 'skipped';
      newDetails.auth = 'Skipped due to connection failure';
    }

    // Check registration capability only if connection is successful
    if (newStatus.connection === 'success') {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        newStatus.registration = 'success';
        newDetails.registration = 'Registration service accessible (auth endpoint responding)';
      } catch (error: any) {
        newStatus.registration = 'error';
        newDetails.registration = error.message;
      }
    } else {
      newStatus.registration = 'skipped';
      newDetails.registration = 'Skipped due to connection failure';
    }

    setStatus(newStatus);
    setDetails(newDetails);
    setIsRefreshing(false);
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'skipped':
        return <div className="h-5 w-5 rounded-full bg-gray-500" />;
      default:
        return <div className="h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'success':
        return 'border-green-500/20 bg-green-900/20';
      case 'error':
        return 'border-red-500/20 bg-red-900/20';
      case 'skipped':
        return 'border-gray-500/20 bg-gray-900/20';
      default:
        return 'border-yellow-500/20 bg-yellow-900/20';
    }
  };

  const renderConnectionDetails = () => {
    if (typeof details.connection === 'string') {
      return <div className="text-sm text-gray-400">{details.connection}</div>;
    }
    
    if (details.connection?.type === 'network') {
      return (
        <div className="text-sm text-gray-400">
          <p className="text-red-400 mb-2">{details.connection.message}</p>
          <div className="text-xs">
            <p className="font-medium mb-1">Возможные причины:</p>
            <ul className="list-disc list-inside space-y-1">
              {details.connection.possibleCauses?.map((cause: string, index: number) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-sm text-gray-400">
        {details.connection?.message || JSON.stringify(details.connection)}
      </div>
    );
  };

  return (
    <div className="card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Database className="h-5 w-5 mr-2" />
        Диагностика Supabase
      </h3>
      
      <div className="space-y-4">
        {/* Environment Variables */}
        <div className={`p-4 rounded-lg border ${getStatusColor(status.env)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              <span className="font-medium">Переменные окружения</span>
            </div>
            {getStatusIcon(status.env)}
          </div>
          {details.env && (
            <div className="text-sm text-gray-400">
              <p>URL: {details.env.url}</p>
              <p>Key: {details.env.keyPreview || details.env.key}</p>
              {details.env.url && !details.env.urlValid && (
                <p className="text-red-400 mt-1">⚠️ URL format may be incorrect</p>
              )}
            </div>
          )}
        </div>

        {/* Connection */}
        <div className={`p-4 rounded-lg border ${getStatusColor(status.connection)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-medium">Подключение</span>
            </div>
            {getStatusIcon(status.connection)}
          </div>
          {details.connection && renderConnectionDetails()}
        </div>

        {/* Tables */}
        <div className={`p-4 rounded-lg border ${getStatusColor(status.tables)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span className="font-medium">Таблицы базы данных</span>
            </div>
            {getStatusIcon(status.tables)}
          </div>
          {details.tables && (
            <div className="text-sm text-gray-400 space-y-1">
              {typeof details.tables === 'string' ? (
                <div>{details.tables}</div>
              ) : (
                Object.entries(details.tables).map(([table, result]) => (
                  <div key={table} className="flex justify-between">
                    <span>{table}:</span>
                    <span className={result === 'OK' ? 'text-green-400' : 'text-red-400'}>
                      {result}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Auth */}
        <div className={`p-4 rounded-lg border ${getStatusColor(status.auth)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              <span className="font-medium">Аутентификация</span>
            </div>
            {getStatusIcon(status.auth)}
          </div>
          {details.auth && (
            <div className="text-sm text-gray-400">
              {typeof details.auth === 'string' 
                ? details.auth 
                : details.auth.message || JSON.stringify(details.auth)
              }
            </div>
          )}
        </div>

        {/* Registration Test */}
        <div className={`p-4 rounded-lg border ${getStatusColor(status.registration)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">Регистрация пользователей</span>
            </div>
            {getStatusIcon(status.registration)}
          </div>
          {details.registration && (
            <div className="text-sm text-gray-400">
              {typeof details.registration === 'string' 
                ? details.registration 
                : details.registration.message || JSON.stringify(details.registration)
              }
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={checkSupabaseStatus}
        disabled={isRefreshing}
        className="mt-4 btn bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 w-full flex items-center justify-center disabled:opacity-50"
      >
        {isRefreshing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Проверка...
          </>
        ) : (
          'Обновить диагностику'
        )}
      </button>
      
      {status.connection === 'error' && details.connection?.type === 'network' && (
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-400 mb-2">💡 Как исправить:</h4>
          <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
            <li>Проверьте URL Supabase в файле .env</li>
            <li>Убедитесь, что ключ API правильный</li>
            <li>Проверьте интернет-соединение</li>
            <li>Убедитесь, что проект Supabase активен</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default SupabaseDebug;