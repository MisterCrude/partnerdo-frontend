import { IProposalCategory } from '@models/proposal';

export const BRAND_NAME = 'PartnerDo';

export const CATEGORIES_DATA: IProposalCategory[] = [
    {
        name: 'Sport',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3160/3160174.svg',
        bgColor: 'green.300',
    },
    {
        name: 'Muzyka',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3655/3655247.svg',
        bgColor: 'purple.400',
    },
    {
        name: 'Nauka',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3528/3528211.svg',
        bgColor: 'blue.400',
    },
    {
        name: 'Dzieci',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3658/3658919.svg',
        bgColor: 'orange.400',
    },
    {
        name: 'Podróże',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3644/3644078.svg',
        bgColor: 'blue.300',
    },
    {
        name: 'Gry',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3658/3658828.svg',
        bgColor: 'purple.300',
    },
    {
        name: 'Rozrywka',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3655/3655258.svg',
        bgColor: 'red.300',
    },
    {
        name: 'Biznes',
        iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3165/3165489.svg',
        bgColor: 'teal.300',
    },
];

export const TOAST_DURATION = 5000;

export const ROUTES = {
    BROWSER: '/',
    HOME: '/home',
    NOT_FOUND: '/404',
    FAQ: '/faq',
    LOGIN: '/login',
    REGISTER: '/register',
    REMIND_PASSWORD: '/remind-password',
    CONVERSATIONS: '/conversations',
    PROPOSAL: '/proposal',
    USER: '/user',
    PROFILE: '/profile',
};

export const CITIES = [
    'Warszawa',
    'Kraków',
    'Łódź',
    'Wrocław',
    'Poznań',
    'Gdańsk',
    'Szczecin',
    'Bydgoszcz',
    'Lublin',
    'Białystok',
    'Katowice',
    'Gdynia',
];

export const AGE_GROUPS: Record<string, string> = {
    young: '18 - 25',
    semimiddle: '26 - 35',
    middle: '36 - 45',
    semisenior: '45 - 55',
    senior: '> 55',
};

export const GENDER: Record<string, string> = {
    male: 'Mężczyzna ',
    female: 'Kobieta',
};
