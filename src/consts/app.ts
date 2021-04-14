import { IProposalCategoryIcon } from '@models/proposal';

import {
    BusinessColoredIcon,
    BusinessIcon,
    MusicColoredIcon,
    MusicIcon,
    TravelColoredIcon,
    TravelIcon,
    LearningColoredIcon,
    LearningIcon,
    SportColoredIcon,
    SportIcon,
    EventColoredIcon,
    EventIcon,
    GameColoredIcon,
    GameIcon,
    ChildrenColoredIcon,
    ChildrenIcon,
} from '@theme/customIcons';

export const BRAND_NAME = 'partnerDo.pl';

export const CATEGORIES_DATA: IProposalCategoryIcon[] = [
    // https://www.flaticon.com/free-icon/guitar_2892205?term=guitar&page=1&position=13&related_item_id=2892205
    // https://www.flaticon.com/packs/retail-10?k=1607802870403
    {
        name: 'Sport',
        iconColored: SportColoredIcon,
        iconStroked: SportIcon,
    },
    {
        name: 'Muzyka',
        iconColored: MusicColoredIcon,
        iconStroked: MusicIcon,
    },
    {
        name: 'Nauka',
        iconColored: LearningColoredIcon,
        iconStroked: LearningIcon,
    },
    {
        name: 'Dzieci',
        iconColored: ChildrenColoredIcon,
        iconStroked: ChildrenIcon,
    },
    {
        name: 'Podróże',
        iconColored: TravelColoredIcon,
        iconStroked: TravelIcon,
    },
    {
        name: 'Gry',
        iconColored: GameColoredIcon,
        iconStroked: GameIcon,
    },
    {
        name: 'Rozrywka',
        iconColored: EventColoredIcon,
        iconStroked: EventIcon,
    },
    {
        name: 'Biznes',
        iconColored: BusinessColoredIcon,
        iconStroked: BusinessIcon,
    },
];

export const TOAST_DURATION = 5000;

export const PAGINATION_ITEMS_LIMIT = 10;

export const DEFAULT_LOCALE = 'pl-PL';

export const SHORT_CONTENT_WORDS_AMOUNT = 25;
export const SHORT_DESC_WORDS_AMOUT = 10;

export const ACCEPTED_UPLOAD_IMAGE_FORMAT = 'image/png, image/jpeg, image/jpg';
export const AVATAR_FALLBACK_URL = 'https://via.placeholder.com/300?text=Nie+ma+avataru+:(';
export const AVATAR_MAX_FILE_SIZE = 5000 * 1024;
