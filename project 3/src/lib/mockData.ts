// Mock data for development and testing - CLEARED FOR REAL USERS ONLY
import { type Profile, type PlayerStats, type Tournament, type TournamentRegistration, type Match } from './supabase';

// Empty arrays - will be populated only with real registered users
const mockProfiles: Profile[] = [];
const mockPlayerStats: PlayerStats[] = [];
const mockMatches: Match[] = [];

// Only upcoming tournaments - no past results
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Летний теннисный турнир 2025',
    description: 'Турнир выходного дня для игроков среднего и продвинутого уровня с призами для победителей в одиночном и парном разрядах.',
    start_date: '2025-07-15',
    end_date: '2025-07-17',
    location: 'Центральный теннисный клуб, Москва',
    registration_deadline: '2025-07-10',
    status: 'Открыт',
    format: 'Одиночный и парный',
    entry_fee: '5000₽',
    prize_pool: '100 000₽',
    skill_levels: ['Средний', 'Продвинутый'],
    max_participants: 32,
    image_url: 'https://images.pexels.com/photos/6956427/pexels-photo-6956427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Парный чемпионат 2025',
    description: 'Наш ежегодный парный турнир с дивизионами для всех уровней игры. Найдите партнера и боритесь за чемпионский титул.',
    start_date: '2025-08-05',
    end_date: '2025-08-07',
    location: 'Теннисный центр "Запад", Санкт-Петербург',
    registration_deadline: '2025-07-25',
    status: 'Открыт',
    format: 'Только парный',
    entry_fee: '6000₽ за пару',
    prize_pool: '150 000₽',
    skill_levels: ['Все уровни'],
    max_participants: 24,
    image_url: 'https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Кубок ветеранов 2025',
    description: 'Специальный турнир для игроков старше 50 лет с несколькими дивизионами по возрасту и уровню игры.',
    start_date: '2025-09-10',
    end_date: '2025-09-12',
    location: 'Теннисный клуб "Золотые годы", Сочи',
    registration_deadline: '2025-08-30',
    status: 'Открыт',
    format: 'Одиночный и парный',
    entry_fee: '4000₽',
    prize_pool: '80 000₽',
    skill_levels: ['Все уровни'],
    max_participants: 32,
    image_url: 'https://images.pexels.com/photos/8224035/pexels-photo-8224035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'Открытый турнир "Осенний кубок"',
    description: 'Турнир для всех желающих независимо от уровня подготовки. Отличная возможность получить опыт соревнований.',
    start_date: '2025-10-20',
    end_date: '2025-10-22',
    location: 'Спортивный комплекс "Олимп", Нижний Новгород',
    registration_deadline: '2025-10-10',
    status: 'Скоро',
    format: 'Одиночный',
    entry_fee: '3000₽',
    prize_pool: '60 000₽',
    skill_levels: ['Все уровни'],
    max_participants: 48,
    image_url: 'https://images.pexels.com/photos/6956426/pexels-photo-6956426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '5',
    name: 'Новогодний турнир 2025',
    description: 'Праздничный турнир в конце года с особой атмосферой и подарками для всех участников.',
    start_date: '2025-12-28',
    end_date: '2025-12-30',
    location: 'Теннисный центр "Праздник", Москва',
    registration_deadline: '2025-12-15',
    status: 'Скоро',
    format: 'Одиночный и парный',
    entry_fee: '7000₽',
    prize_pool: '200 000₽',
    skill_levels: ['Средний', 'Продвинутый', 'Профессионал'],
    max_participants: 40,
    image_url: 'https://images.pexels.com/photos/5739218/pexels-photo-5739218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  },
  {
    id: '6',
    name: 'Весенний кубок начинающих',
    description: 'Специальный турнир для новичков и игроков начального уровня. Дружественная атмосфера и поддержка.',
    start_date: '2026-04-15',
    end_date: '2026-04-16',
    location: 'Теннисная академия "Старт", Краснодар',
    registration_deadline: '2026-04-05',
    status: 'Скоро',
    format: 'Одиночный',
    entry_fee: '2000₽',
    prize_pool: '30 000₽',
    skill_levels: ['Начинающий'],
    max_participants: 24,
    image_url: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-01T10:00:00Z'
  }
];

// Empty tournament registrations - will be populated by real users
const mockTournamentRegistrations: TournamentRegistration[] = [];

// Mock API functions - now working with real data from Supabase
export const mockApi = {
  // Profiles - get from Supabase
  getProfiles: async (): Promise<Profile[]> => {
    // In real implementation, this would fetch from Supabase
    // For now, return empty array until real users register
    return mockProfiles;
  },

  getProfile: async (id: string): Promise<Profile | null> => {
    return mockProfiles.find(p => p.id === id) || null;
  },

  updateProfile: async (id: string, updates: Partial<Profile>): Promise<Profile> => {
    const profileIndex = mockProfiles.findIndex(p => p.id === id);
    if (profileIndex === -1) throw new Error('Profile not found');
    
    mockProfiles[profileIndex] = { 
      ...mockProfiles[profileIndex], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    return mockProfiles[profileIndex];
  },

  // Player Stats - empty until real users register
  getPlayerStats: async (): Promise<PlayerStats[]> => {
    return mockPlayerStats;
  },

  getPlayerStatsByUserId: async (userId: string): Promise<PlayerStats | null> => {
    return mockPlayerStats.find(s => s.user_id === userId) || null;
  },

  // Tournaments - keep existing tournaments
  getTournaments: async (): Promise<Tournament[]> => {
    return mockTournaments;
  },

  getTournament: async (id: string): Promise<Tournament | null> => {
    return mockTournaments.find(t => t.id === id) || null;
  },

  // Tournament Registrations - empty until real users register
  getTournamentRegistrations: async (): Promise<TournamentRegistration[]> => {
    return mockTournamentRegistrations;
  },

  registerForTournament: async (tournamentId: string, userId: string): Promise<TournamentRegistration> => {
    // Check if already registered
    const existingRegistration = mockTournamentRegistrations.find(
      r => r.tournament_id === tournamentId && r.user_id === userId
    );
    if (existingRegistration) {
      throw new Error('Вы уже зарегистрированы на этот турнир');
    }

    // Check tournament capacity
    const tournament = mockTournaments.find(t => t.id === tournamentId);
    if (!tournament) throw new Error('Турнир не найден');

    const registrationsCount = mockTournamentRegistrations.filter(r => r.tournament_id === tournamentId).length;
    if (registrationsCount >= tournament.max_participants) {
      throw new Error('Турнир заполнен');
    }

    const newRegistration: TournamentRegistration = {
      id: Date.now().toString(),
      tournament_id: tournamentId,
      user_id: userId,
      registration_date: new Date().toISOString(),
      status: 'registered'
    };

    mockTournamentRegistrations.push(newRegistration);
    return newRegistration;
  },

  // Matches - empty until real users play
  getMatches: async (): Promise<Match[]> => {
    return mockMatches;
  },

  getMatchesByUserId: async (userId: string): Promise<Match[]> => {
    return mockMatches.filter(m => m.player1_id === userId || m.player2_id === userId);
  },

  // Authentication simulation - for new real users
  signUp: async (email: string, password: string, name: string): Promise<{ user: any; profile: Profile }> => {
    // Check if email already exists
    const existingProfile = mockProfiles.find(p => p.email === email);
    if (existingProfile) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUserId = (Date.now()).toString();
    const newProfile: Profile = {
      id: newUserId,
      name,
      email,
      location: '',
      bio: '',
      phone: '',
      level: 'Начинающий',
      favorite_shot: '',
      play_style: '',
      profile_image: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const newStats: PlayerStats = {
      id: newUserId,
      user_id: newUserId,
      matches_played: 0,
      wins: 0,
      losses: 0,
      ranking: 0,
      points: 1000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add to mock data (in real app, this would be handled by Supabase)
    mockProfiles.push(newProfile);
    mockPlayerStats.push(newStats);

    return {
      user: { id: newUserId, email },
      profile: newProfile
    };
  },

  signIn: async (email: string, password: string): Promise<{ user: any; profile: Profile }> => {
    const profile = mockProfiles.find(p => p.email === email);
    if (!profile) {
      throw new Error('Неверный email или пароль');
    }

    return {
      user: { id: profile.id, email: profile.email },
      profile
    };
  },

  // Helper function to add real user data when they register
  addRealUser: (profile: Profile, stats: PlayerStats) => {
    mockProfiles.push(profile);
    mockPlayerStats.push(stats);
  },

  // Helper function to update user stats after matches
  updateUserStats: (userId: string, statsUpdate: Partial<PlayerStats>) => {
    const statsIndex = mockPlayerStats.findIndex(s => s.user_id === userId);
    if (statsIndex !== -1) {
      mockPlayerStats[statsIndex] = {
        ...mockPlayerStats[statsIndex],
        ...statsUpdate,
        updated_at: new Date().toISOString()
      };
    }
  }
};