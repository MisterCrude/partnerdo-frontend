import React from 'react';
import { createIcon } from '@chakra-ui/icon';

export const ProfileIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'ProfileIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0043 2C9.07027 2 6.69177 4.38864 6.69177 7.33517C6.69177 10.2817 9.07027 12.6703 12.0043 12.6703C14.9383 12.6703 17.3168 10.2817 17.3168 7.33517C17.3168 4.38864 14.9383 2 12.0043 2ZM12.0043 3.44767C14.1422 3.44767 15.8753 5.18816 15.8753 7.33517C15.8753 9.48218 14.1422 11.2227 12.0043 11.2227C9.8664 11.2227 8.1333 9.48218 8.1333 7.33517C8.1333 5.18816 9.8664 3.44767 12.0043 3.44767ZM9.83005 14.8209C9.05233 14.8749 8.26621 14.9859 7.4908 15.1521C5.99418 15.4604 4.79685 16.0763 4.28724 17.0999C4.09503 17.5002 3.99839 17.9288 4.00002 18.3627C3.99944 18.7935 4.0953 19.2227 4.28062 19.6153C4.76994 20.6271 5.8278 21.1997 7.25624 21.5171L7.51213 21.5705C8.26648 21.7407 9.05284 21.8553 9.84446 21.909C9.91189 21.9288 10.0726 21.9472 10.248 21.9561L10.3922 21.9615C10.4664 21.9633 10.5506 21.9637 10.676 21.9637C11.8138 22.0263 12.9934 22.0081 14.1675 21.9081C14.7932 21.8653 15.4231 21.7835 16.0477 21.6636L16.5151 21.5666C18.0576 21.2623 19.2126 20.6836 19.7186 19.6164C20.0937 18.8241 20.0937 17.9047 19.7188 17.1127C19.214 16.0483 18.0737 15.4744 16.5034 15.1509C15.8873 15.0194 15.2612 14.922 14.6307 14.8599L14.1697 14.8209C12.7259 14.6935 11.2738 14.6935 9.83005 14.8209ZM14.0436 16.263L14.0562 16.264C14.7799 16.3149 15.4991 16.4165 16.2087 16.568C17.3751 16.8083 18.1667 17.2067 18.4171 17.7348C18.6057 18.133 18.6057 18.5958 18.4169 18.9944C18.1829 19.4879 17.472 19.8691 16.4445 20.1021L16.2195 20.1498C15.496 20.3112 14.7791 20.4152 14.0576 20.4647C12.9379 20.5599 11.8249 20.5771 10.7148 20.5171L10.3212 20.5103C10.2119 20.5048 10.1198 20.4942 10.0345 20.4771C9.35872 20.4261 8.75066 20.3454 8.16027 20.2283L7.80775 20.1537C6.63771 19.9244 5.83915 19.5243 5.58024 18.989C5.48964 18.797 5.44125 18.5803 5.44154 18.3609C5.44073 18.1428 5.48848 17.931 5.58118 17.7379C5.83293 17.2324 6.67919 16.7971 7.78606 16.569C8.50073 16.4159 9.21962 16.3144 9.94294 16.264C11.316 16.143 12.6837 16.143 14.0436 16.263Z"
        />
    ),
});

export const ChatIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'ChatIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.058 2.00026C8.54635 1.98615 5.28554 3.80703 3.46059 6.80012C1.63541 9.79361 1.51288 13.5227 3.13765 16.6292L3.32147 16.9875C3.39175 17.1192 3.40531 17.2613 3.36458 17.3927C3.10204 18.0865 2.87136 18.8357 2.6873 19.597L2.66776 19.761C2.66776 20.5264 3.07616 21.0523 3.88671 21.0343L4.02167 21.0181C4.75798 20.8555 5.4831 20.646 6.19261 20.3909C6.28665 20.3671 6.4407 20.3763 6.57971 20.4332L7.26224 20.8195C7.26378 20.8242 7.26493 20.8278 7.27208 20.832L7.31788 20.848C10.9929 22.7804 15.4812 22.2473 18.5997 19.5079C21.7187 16.7681 22.8199 12.3901 21.3675 8.50389C19.9153 4.61805 16.2115 2.03079 12.058 2.00026ZM11.7675 3.39905L12.0484 3.39465C15.6231 3.42184 18.8109 5.64864 20.0605 8.99237C21.31 12.3357 20.3626 16.1021 17.6788 18.4596L17.4587 18.6466C14.8626 20.7781 11.2582 21.2077 8.23269 19.7468L7.94496 19.6026L7.95729 19.6042L7.93909 19.5993L7.51677 19.3569C7.36471 19.271 7.24408 19.2059 7.14685 19.1591C6.6837 18.9681 6.21354 18.94 5.77133 19.0617L5.35272 19.2055C5.07605 19.2969 4.80372 19.3795 4.53273 19.4541L4.13767 19.5573L4.04356 19.9249C4.21419 19.2192 4.42804 18.5247 4.68389 17.8451C4.84853 17.3183 4.79818 16.7905 4.55755 16.3402L4.37662 15.9874C2.97627 13.3099 3.08168 10.1019 4.65196 7.52651C6.17338 5.03123 8.85494 3.48238 11.7675 3.39905ZM6.4746 12.0002C6.4746 11.37 6.98586 10.8596 7.61596 10.8596C8.24606 10.8596 8.75732 11.37 8.75732 12.0002C8.75732 12.6304 8.24606 13.1409 7.61596 13.1409C6.98586 13.1409 6.4746 12.6304 6.4746 12.0002ZM10.9115 12.0002C10.9115 11.37 11.4227 10.8596 12.0528 10.8596C12.6829 10.8596 13.1942 11.37 13.1942 12.0002C13.1942 12.6304 12.6829 13.1409 12.0528 13.1409C11.4227 13.1409 10.9115 12.6304 10.9115 12.0002ZM16.4897 10.8596C15.8596 10.8596 15.3484 11.37 15.3484 12.0002C15.3484 12.6304 15.8596 13.1409 16.4897 13.1409C17.1198 13.1409 17.6311 12.6304 17.6311 12.0002C17.6311 11.37 17.1198 10.8596 16.4897 10.8596Z"
        />
    ),
});

export const DangerIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'DangerIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.99988 12.0002C1.99988 6.47797 6.47766 2.00018 11.9999 2.00018C17.5228 2.00018 21.9999 6.47764 21.9999 12.0002C21.9999 17.5227 17.5228 22.0002 11.9999 22.0002C6.47766 22.0002 1.99988 17.5224 1.99988 12.0002ZM20.4999 12.0002C20.4999 7.30604 16.6943 3.50018 11.9999 3.50018C7.30609 3.50018 3.49988 7.3064 3.49988 12.0002C3.49988 16.694 7.30609 20.5002 11.9999 20.5002C16.6943 20.5002 20.4999 16.6943 20.4999 12.0002ZM11.995 7.45428C12.3747 7.45428 12.6885 7.73644 12.7381 8.10251L12.745 8.20428V12.6233C12.745 13.0375 12.4092 13.3733 11.995 13.3733C11.6153 13.3733 11.3015 13.0911 11.2518 12.7251L11.245 12.6233V8.20428C11.245 7.79007 11.5808 7.45428 11.995 7.45428ZM12.755 15.7961C12.755 15.3819 12.4192 15.0461 12.005 15.0461L11.8932 15.0529C11.5271 15.1026 11.245 15.4164 11.245 15.7961C11.245 16.2103 11.5808 16.5461 11.995 16.5461L12.1067 16.5392C12.4728 16.4896 12.755 16.1758 12.755 15.7961Z"
        />
    ),
});

export const MoreCircleIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'MoreCircleIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0002 2.00018C6.4773 2.00018 2.00018 6.47764 2.00018 12.0002C2.00018 17.5227 6.4773 22.0002 12.0002 22.0002C17.5224 22.0002 22.0002 17.5224 22.0002 12.0002C22.0002 6.47797 17.5224 2.00018 12.0002 2.00018ZM12.0002 3.50018C16.694 3.50018 20.5002 7.3064 20.5002 12.0002C20.5002 16.694 16.694 20.5002 12.0002 20.5002C7.30575 20.5002 3.50018 16.6943 3.50018 12.0002C3.50018 7.30604 7.30575 3.50018 12.0002 3.50018ZM6.32268 12.0004C6.32268 12.6604 6.85968 13.1974 7.52068 13.1974C8.18168 13.1974 8.71868 12.6604 8.71868 12.0004C8.71868 11.3404 8.18168 10.8024 7.52068 10.8024C6.85968 10.8024 6.32268 11.3404 6.32268 12.0004ZM12.0002 13.1974C11.3392 13.1974 10.8022 12.6604 10.8022 12.0004C10.8022 11.3404 11.3392 10.8024 12.0002 10.8024C12.6612 10.8024 13.1982 11.3404 13.1982 12.0004C13.1982 12.6604 12.6612 13.1974 12.0002 13.1974ZM15.2812 12.0004C15.2812 12.6604 15.8182 13.1974 16.4792 13.1974C17.1402 13.1974 17.6772 12.6604 17.6772 12.0004C17.6772 11.3404 17.1402 10.8024 16.4792 10.8024C15.8182 10.8024 15.2812 11.3404 15.2812 12.0004Z"
        />
    ),
});

export const MenuIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'MenuIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 18h8a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2zm0-5h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2zM3 7a1 1 0 0 0 1 1h12a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1z"
        />
    ),
});

export const PlusIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'PlusIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3588 2H7.6412C4.25586 2 2 4.4199 2 7.89317V16.1068C2 19.5833 4.24992 22 7.6412 22H16.3588C19.7501 22 22 19.5833 22 16.1068V7.89317C22 4.41665 19.7501 2 16.3588 2ZM7.6412 3.39535H16.3588C18.9563 3.39535 20.6047 5.16587 20.6047 7.89317V16.1068C20.6047 18.8341 18.9563 20.6047 16.3588 20.6047H7.6412C5.04372 20.6047 3.39535 18.8341 3.39535 16.1068V7.89317C3.39535 5.16949 5.04923 3.39535 7.6412 3.39535ZM12 7.88587C12.3532 7.88587 12.6451 8.14834 12.6913 8.48887L12.6977 8.58354V11.2935H15.4109C15.7962 11.2935 16.1085 11.6058 16.1085 11.9911C16.1085 12.3444 15.8461 12.6363 15.5055 12.6825L15.4109 12.6888H12.6977V15.3988C12.6977 15.7841 12.3853 16.0964 12 16.0964C11.6468 16.0964 11.3549 15.834 11.3087 15.4934L11.3023 15.3988V12.6888H8.58915C8.20383 12.6888 7.89147 12.3765 7.89147 11.9911C7.89147 11.6379 8.15394 11.346 8.49448 11.2998L8.58915 11.2935H11.3023V8.58354C11.3023 8.19823 11.6147 7.88587 12 7.88587Z"
        />
    ),
});

export const SearchIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'SearchIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z"
        />
    ),
});

export const LocationIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'LocationIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0288 2.00005C7.41977 1.98439 3.6551 5.65135 3.50463 10.2414L3.5 10.5263C3.57661 12.7761 4.34207 14.9207 5.69028 16.6876L6.00692 17.1008C7.2938 18.7371 8.82311 20.1733 10.5403 21.3571L10.9537 21.6354L11.014 21.6828C11.6026 22.1057 12.3973 22.1057 12.9858 21.6828L13.036 21.6415C14.3986 20.7579 15.655 19.7196 16.7805 18.5473C19.0686 16.1252 20.4477 13.4112 20.4998 10.655L20.4999 10.5526C20.5155 5.93192 16.8598 2.15567 12.284 2.00469L12.0288 2.00005ZM12.0237 3.51747C15.8022 3.53038 18.87 6.54942 18.9839 10.3091L18.9871 10.6406C18.9434 12.9514 17.7334 15.3324 15.6866 17.4991C14.6429 18.5862 13.4727 19.5526 12.2036 20.3745L12.119 20.438C12.0506 20.4974 11.9492 20.4974 11.8809 20.438L11.7987 20.376C9.90797 19.1416 8.24857 17.583 6.89636 15.7717C5.80718 14.3442 5.16175 12.6374 5.03184 10.8569L5.01275 10.4999C5.02559 6.71221 8.03532 3.63498 11.7835 3.52071L12.0237 3.51747ZM11.9999 7.40129C10.2115 7.40129 8.76176 8.85554 8.76176 10.6495C8.76176 12.4434 10.2115 13.8976 11.9999 13.8976C13.7883 13.8976 15.2381 12.4434 15.2381 10.6495C15.2381 8.85554 13.7883 7.40129 11.9999 7.40129ZM11.9999 8.91871C12.9528 8.91871 13.7253 9.69359 13.7253 10.6495C13.7253 11.6053 12.9528 12.3802 11.9999 12.3802C11.047 12.3802 10.2745 11.6053 10.2745 10.6495C10.2745 9.69359 11.047 8.91871 11.9999 8.91871Z"
        />
    ),
});

export const FacebookIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'FacebookIcon',
    path: (
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"
        />
    ),
});

export const InstagramIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'InstagramIcon',
    path: (
        <>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16,3H8C5.239,3,3,5.239,3,8v8c0,2.761,2.239,5,5,5h8c2.761,0,5-2.239,5-5V8C21,5.239,18.761,3,16,3z M12,17c-2.761,0-5-2.239-5-5s2.239-5,5-5s5,2.239,5,5S14.761,17,12,17z M18,7c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S18.552,7,18,7z"
            />
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 9A3 3 0 1 0 12 15A3 3 0 1 0 12 9Z" />
        </>
    ),
});

export const YoutubeIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'YoutubeIcon',
    path: (
        <>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.324 9.736c-.261-.176-.446-.449-.556-.82-.11-.371-.165-.864-.165-1.479V6.598c0-.622.063-1.121.188-1.498.126-.377.322-.652.589-.824.267-.173.617-.259 1.051-.259.427 0 .769.088 1.027.264.258.176.446.451.565.824.119.374.179.872.179 1.493v.839c0 .616-.058 1.11-.174 1.484-.116.374-.305.647-.565.82C12.203 9.914 11.849 10 11.403 10 10.945 10 10.585 9.912 10.324 9.736zM11.785 8.832c.072-.188.108-.496.108-.923v-1.8c0-.415-.036-.718-.108-.909-.072-.192-.2-.287-.382-.287-.176 0-.3.096-.372.287-.072.192-.108.495-.108.909v1.8c0 .427.034.735.104.923.069.188.195.283.377.283C11.585 9.114 11.713 9.02 11.785 8.832zM7.158 7.343L5.679 2H6.97l.518 2.422C7.62 5.018 7.717 5.527 7.78 5.948h.038C7.862 5.647 7.959 5.141 8.11 4.431L8.647 2h1.291L8.44 7.343v2.563H7.158V7.343zM17.401 4.13v5.776h-1.018l-.113-.707h-.028C15.966 9.733 15.551 10 14.999 10c-.383 0-.666-.126-.848-.377-.182-.251-.273-.644-.273-1.178V4.13h1.3v4.24c0 .258.028.441.085.551.057.11.151.165.283.165.113 0 .221-.034.325-.104.104-.069.181-.157.231-.264V4.13H17.401z"
            />
            <g>
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.333 15.792c-.056-.066-.142-.099-.259-.099-.117 0-.203.035-.259.103-.056.069-.093.182-.111.338-.019.156-.028.394-.028.712v.35h.803v-.35c0-.313-.011-.55-.032-.712C17.427 15.972 17.389 15.858 17.333 15.792zM13.851 15.86c-.061-.087-.147-.131-.259-.131-.106 0-.204.042-.294.127-.09.085-.154.194-.191.326v2.768c.048.085.11.148.187.191.077.042.16.064.251.064.117 0 .209-.042.278-.127.069-.085.118-.228.147-.43.029-.201.044-.48.044-.835v-.628c0-.382-.012-.676-.036-.883C13.954 16.095 13.911 15.947 13.851 15.86z"
                />
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19,11H5c-1.1,0-2,0.9-2,2v7c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-7C21,11.9,20.1,11,19,11z M7.649,19.92H6.576V14.13h-1.09v-0.883h3.253v0.883h-1.09V19.92z M11.387,19.92h-0.859l-0.095-0.597h-0.024C10.175,19.775,9.825,20,9.358,20c-0.324,0-0.562-0.106-0.716-0.318c-0.154-0.212-0.231-0.544-0.231-0.994v-3.643H9.51v3.58c0,0.217,0.024,0.373,0.072,0.465c0.048,0.093,0.127,0.139,0.239,0.139c0.095,0,0.187-0.029,0.274-0.088c0.088-0.058,0.152-0.133,0.195-0.223v-3.874h1.098V19.92z M15.119,17.876c0,0.727-0.088,1.261-0.263,1.603s-0.448,0.513-0.819,0.513c-0.207,0-0.395-0.048-0.565-0.143c-0.17-0.095-0.297-0.225-0.382-0.39h-0.024l-0.111,0.461h-0.907V13h1.058l0,2.569h0.008c0.095-0.186,0.231-0.335,0.406-0.449c0.175-0.114,0.363-0.171,0.565-0.171c0.26,0,0.464,0.069,0.612,0.207c0.148,0.138,0.256,0.361,0.322,0.668c0.066,0.308,0.099,0.735,0.099,1.281V17.876z M18.514,17.848h-1.837v0.247c0,0.313,0.009,0.548,0.028,0.704c0.019,0.156,0.057,0.271,0.115,0.342c0.058,0.072,0.148,0.107,0.27,0.107c0.164,0,0.277-0.064,0.338-0.191c0.061-0.127,0.094-0.339,0.099-0.636l0.947,0.056c0.005,0.042,0.008,0.101,0.008,0.175c0,0.451-0.123,0.788-0.37,1.01c-0.247,0.223-0.595,0.334-1.046,0.334c-0.541,0-0.92-0.17-1.138-0.509c-0.218-0.339-0.326-0.864-0.326-1.575V17.06c0-0.732,0.113-1.266,0.338-1.603c0.225-0.337,0.611-0.505,1.157-0.505c0.376,0,0.665,0.069,0.867,0.207c0.201,0.138,0.343,0.353,0.426,0.644c0.082,0.292,0.123,0.695,0.123,1.209V17.848z"
                />
            </g>
        </>
    ),
});

export const SportCategoryIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'SportCategoryIcon',
    path: (
        <>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16.87V9.257H21V16.931C21 20.07 19.0241 22 15.8628 22H8.12733C4.99561 22 3 20.03 3 16.87ZM7.95938 14.41C7.50494 14.431 7.12953 14.07 7.10977 13.611C7.10977 13.151 7.46542 12.771 7.91987 12.75C8.36443 12.75 8.72997 13.101 8.73985 13.55C8.7596 14.011 8.40395 14.391 7.95938 14.41ZM12.0198 14.41C11.5653 14.431 11.1899 14.07 11.1701 13.611C11.1701 13.151 11.5258 12.771 11.9802 12.75C12.4248 12.75 12.7903 13.101 12.8002 13.55C12.82 14.011 12.4643 14.391 12.0198 14.41ZM16.0505 18.09C15.596 18.08 15.2305 17.7 15.2305 17.24C15.2206 16.78 15.5862 16.401 16.0406 16.391H16.0505C16.5148 16.391 16.8902 16.771 16.8902 17.24C16.8902 17.71 16.5148 18.09 16.0505 18.09ZM11.1701 17.24C11.1899 17.7 11.5653 18.061 12.0198 18.04C12.4643 18.021 12.82 17.641 12.8002 17.181C12.7903 16.731 12.4248 16.38 11.9802 16.38C11.5258 16.401 11.1701 16.78 11.1701 17.24ZM7.09989 17.24C7.11965 17.7 7.49506 18.061 7.94951 18.04C8.39407 18.021 8.74973 17.641 8.72997 17.181C8.72009 16.731 8.35456 16.38 7.90999 16.38C7.45554 16.401 7.09989 16.78 7.09989 17.24ZM15.2404 13.601C15.2404 13.141 15.596 12.771 16.0505 12.761C16.4951 12.761 16.8507 13.12 16.8705 13.561C16.8804 14.021 16.5247 14.401 16.0801 14.41C15.6257 14.42 15.2503 14.07 15.2404 13.611V13.601Z"
            />
            <path
                opacity="0.4"
                d="M3.00336 9.2569C3.0162 8.6699 3.0656 7.5049 3.15846 7.1299C3.63267 5.0209 5.24298 3.6809 7.54485 3.4899H16.4559C18.738 3.6909 20.3681 5.0399 20.8423 7.1299C20.9342 7.4949 20.9836 8.6689 20.9964 9.2569H3.00336Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
            <path
                d="M8.30486 6.59C8.73955 6.59 9.06556 6.261 9.06556 5.82V2.771C9.06556 2.33 8.73955 2 8.30486 2C7.87017 2 7.54416 2.33 7.54416 2.771V5.82C7.54416 6.261 7.87017 6.59 8.30486 6.59Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
            <path
                d="M15.6949 6.59C16.1197 6.59 16.4556 6.261 16.4556 5.82V2.771C16.4556 2.33 16.1197 2 15.6949 2C15.2603 2 14.9342 2.33 14.9342 2.771V5.82C14.9342 6.261 15.2603 6.59 15.6949 6.59Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </>
    ),
});

export const MusicCategoryIcon: ReturnType<typeof createIcon> = createIcon({
    displayName: 'MusicCategoryIcon',
    path: (
        <>
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.71 10.0721C16.71 10.5716 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5716 18.52 10.0721C18.52 9.5727 18.11 9.16315 17.61 9.16315C17.11 9.16315 16.71 9.5727 16.71 10.0721ZM14.77 16.1054C14.06 16.8147 13.08 17.2542 12 17.2542C10.95 17.2542 9.97 16.8446 9.22 16.1054C8.48 15.3563 8.07 14.3774 8.07 13.3285C8.06 12.2897 8.47 11.3108 9.21 10.5616C9.96 9.81243 10.95 9.40289 12 9.40289C13.05 9.40289 14.04 9.81243 14.78 10.5516C15.52 11.3008 15.93 12.2897 15.93 13.3285C15.92 14.4173 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0799 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9778 9.82 14.5871 10.28 15.0466C10.74 15.5061 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z"
            />
            <path
                opacity="0.4"
                d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </>
    ),
});
