import {KanaEntry} from '@/types/kana'

export const listOfKana: KanaEntry[] = [
    // Гласные
    {hira: 'あ', kata: 'ア', romaji: 'a', cyr: 'а', column: '', row: 'a'},
    {hira: 'い', kata: 'イ', romaji: 'i', cyr: 'и', column: '', row: 'i'},
    {hira: 'う', kata: 'ウ', romaji: 'u', cyr: 'у', column: '', row: 'u'},
    {hira: 'え', kata: 'エ', romaji: 'e', cyr: 'э', column: '', row: 'e'},
    {hira: 'お', kata: 'オ', romaji: 'o', cyr: 'о', column: '', row: 'o'},

    // Ka
    {hira: 'か', kata: 'カ', romaji: 'ka', cyr: 'ка', column: 'k', row: 'a'},
    {hira: 'き', kata: 'キ', romaji: 'ki', cyr: 'ки', column: 'k', row: 'i'},
    {hira: 'く', kata: 'ク', romaji: 'ku', cyr: 'ку', column: 'k', row: 'u'},
    {hira: 'け', kata: 'ケ', romaji: 'ke', cyr: 'кэ', column: 'k', row: 'e'},
    {hira: 'こ', kata: 'コ', romaji: 'ko', cyr: 'ко', column: 'k', row: 'o'},

    // Sa
    {hira: 'さ', kata: 'サ', romaji: 'sa', cyr: 'са', column: 's', row: 'a'},
    {hira: 'し', kata: 'シ', romaji: 'shi', cyr: 'си', column: 's', row: 'i'},
    {hira: 'す', kata: 'ス', romaji: 'su', cyr: 'су', column: 's', row: 'u'},
    {hira: 'せ', kata: 'セ', romaji: 'se', cyr: 'сэ', column: 's', row: 'e'},
    {hira: 'そ', kata: 'ソ', romaji: 'so', cyr: 'со', column: 's', row: 'o'},

    // Ta
    {hira: 'た', kata: 'タ', romaji: 'ta', cyr: 'та', column: 't', row: 'a'},
    {hira: 'ち', kata: 'チ', romaji: 'chi', cyr: 'ти', column: 't', row: 'i'},
    {hira: 'つ', kata: 'ツ', romaji: 'tsu', cyr: 'цу', column: 't', row: 'u'},
    {hira: 'て', kata: 'テ', romaji: 'te', cyr: 'тэ', column: 't', row: 'e'},
    {hira: 'と', kata: 'ト', romaji: 'to', cyr: 'то', column: 't', row: 'o'},

    // Na
    {hira: 'な', kata: 'ナ', romaji: 'na', cyr: 'на', column: 'n', row: 'a'},
    {hira: 'に', kata: 'ニ', romaji: 'ni', cyr: 'ни', column: 'n', row: 'i'},
    {hira: 'ぬ', kata: 'ヌ', romaji: 'nu', cyr: 'ну', column: 'n', row: 'u'},
    {hira: 'ね', kata: 'ネ', romaji: 'ne', cyr: 'нэ', column: 'n', row: 'e'},
    {hira: 'の', kata: 'ノ', romaji: 'no', cyr: 'но', column: 'n', row: 'o'},

    // N - частный
    {hira: 'ん', kata: 'ン', romaji: 'n', cyr: 'н', column: 'n', row: ''},

    // Ha
    {hira: 'は', kata: 'ハ', romaji: 'ha', cyr: 'ха', column: 'h', row: 'a'},
    {hira: 'ひ', kata: 'ヒ', romaji: 'hi', cyr: 'хи', column: 'h', row: 'i'},
    {hira: 'ふ', kata: 'フ', romaji: 'fu', cyr: 'фу', column: 'h', row: 'u'},
    {hira: 'へ', kata: 'ヘ', romaji: 'he', cyr: 'хэ', column: 'h', row: 'e'},
    {hira: 'ほ', kata: 'ホ', romaji: 'ho', cyr: 'хо', column: 'h', row: 'o'},

    // Ma
    {hira: 'ま', kata: 'マ', romaji: 'ma', cyr: 'ма', column: 'm', row: 'a'},
    {hira: 'み', kata: 'ミ', romaji: 'mi', cyr: 'ми', column: 'm', row: 'i'},
    {hira: 'む', kata: 'ム', romaji: 'mu', cyr: 'му', column: 'm', row: 'u'},
    {hira: 'め', kata: 'メ', romaji: 'me', cyr: 'мэ', column: 'm', row: 'e'},
    {hira: 'も', kata: 'モ', romaji: 'mo', cyr: 'мо', column: 'm', row: 'o'},

    // Ya
    {hira: 'や', kata: 'ヤ', romaji: 'ya', cyr: 'я', column: 'y', row: 'a'},
    {hira: 'ゆ', kata: 'ユ', romaji: 'yu', cyr: 'ю', column: 'y', row: 'u'},
    {hira: 'よ', kata: 'ヨ', romaji: 'yo', cyr: 'ё', column: 'y', row: 'o'},

    // Ra
    {hira: 'ら', kata: 'ラ', romaji: 'ra', cyr: 'ра', column: 'r', row: 'a'},
    {hira: 'り', kata: 'リ', romaji: 'ri', cyr: 'ри', column: 'r', row: 'i'},
    {hira: 'る', kata: 'ル', romaji: 'ru', cyr: 'ру', column: 'r', row: 'u'},
    {hira: 'れ', kata: 'レ', romaji: 're', cyr: 'рэ', column: 'r', row: 'e'},
    {hira: 'ろ', kata: 'ロ', romaji: 'ro', cyr: 'ро', column: 'r', row: 'o'},

    // Wa
    {hira: 'わ', kata: 'ワ', romaji: 'wa', cyr: 'ва', column: 'w', row: 'a'},
    {hira: 'を', kata: 'ヲ', romaji: 'wo', cyr: 'о', column: 'w', row: 'o'},

    // Ga
    {hira: 'が', kata: 'ガ', romaji: 'ga', cyr: 'га', column: 'g', row: 'a'},
    {hira: 'ぎ', kata: 'ギ', romaji: 'gi', cyr: 'ги', column: 'g', row: 'i'},
    {hira: 'ぐ', kata: 'グ', romaji: 'gu', cyr: 'гу', column: 'g', row: 'u'},
    {hira: 'げ', kata: 'ゲ', romaji: 'ge', cyr: 'гэ', column: 'g', row: 'e'},
    {hira: 'ご', kata: 'ゴ', romaji: 'go', cyr: 'го', column: 'g', row: 'o'},

    // Za
    {hira: 'ざ', kata: 'ザ', romaji: 'za', cyr: 'дза', column: 'z', row: 'a'},
    {hira: 'じ', kata: 'ジ', romaji: 'ji', cyr: 'дзи', column: 'z', row: 'i'},
    {hira: 'ず', kata: 'ズ', romaji: 'zu', cyr: 'дзу', column: 'z', row: 'u'},
    {hira: 'ぜ', kata: 'ゼ', romaji: 'ze', cyr: 'дзэ', column: 'z', row: 'e'},
    {hira: 'ぞ', kata: 'ゾ', romaji: 'zo', cyr: 'дзо', column: 'z', row: 'o'},

    // Da
    {hira: 'だ', kata: 'ダ', romaji: 'da', cyr: 'да', column: 'd', row: 'a'},
    {hira: 'ぢ', kata: 'ヂ', romaji: 'di', cyr: 'дзи', column: 'd', row: 'i'},
    {hira: 'づ', kata: 'ヅ', romaji: 'du', cyr: 'дзу', column: 'd', row: 'u'},
    {hira: 'で', kata: 'デ', romaji: 'de', cyr: 'дэ', column: 'd', row: 'e'},
    {hira: 'ど', kata: 'ド', romaji: 'do', cyr: 'до', column: 'd', row: 'o'},

    // Ba
    {hira: 'ば', kata: 'バ', romaji: 'ba', cyr: 'ба', column: 'b', row: 'a'},
    {hira: 'び', kata: 'ビ', romaji: 'bi', cyr: 'би', column: 'b', row: 'i'},
    {hira: 'ぶ', kata: 'ブ', romaji: 'bu', cyr: 'бу', column: 'b', row: 'u'},
    {hira: 'べ', kata: 'ベ', romaji: 'be', cyr: 'бэ', column: 'b', row: 'e'},
    {hira: 'ぼ', kata: 'ボ', romaji: 'bo', cyr: 'бо', column: 'b', row: 'o'},

    // Pa
    {hira: 'ぱ', kata: 'パ', romaji: 'pa', cyr: 'па', column: 'p', row: 'a'},
    {hira: 'ぴ', kata: 'ピ', romaji: 'pi', cyr: 'пи', column: 'p', row: 'i'},
    {hira: 'ぷ', kata: 'プ', romaji: 'pu', cyr: 'пу', column: 'p', row: 'u'},
    {hira: 'ぺ', kata: 'ペ', romaji: 'pe', cyr: 'пэ', column: 'p', row: 'e'},
    {hira: 'ぽ', kata: 'ポ', romaji: 'po', cyr: 'по', column: 'p', row: 'o'},
]
