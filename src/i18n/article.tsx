export type ArticleTranslations = {
    [key: string]: string;
}

export type Languages = 'pt' | 'en'

export type ArticleTranslationsType = {
    [key in Languages]: {
        type: { [key: string]: string }
        state: { [key: string]: string }
    }
}

const articleTranslations: ArticleTranslationsType = {
    pt: {
        type: {
            "concepts": "conceito",
            "news": "notícia",
            "tutorials": "tutorial",
            "projects": "projeto",
        },
        state: {
            "draft": "rascunho",
            "published": "publicado",
            "deleted": "excluído",
        }
    },
    en: {
        type: {
            "concepts": "conceito",
            "news": "notícia",
            "tutorials": "tutorial",
            "projects": "projeto",
        },
        state: {
            "draft": "rascunho",
            "published": "publicado",
            "deleted": "excluído",
        }
    }
}

export default articleTranslations