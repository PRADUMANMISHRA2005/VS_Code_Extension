export interface ProjectConfig {
    name: string;
    frontend?: string;
    backend?: string;
    database?: string;
    extras: string[];
    language?: string;
    projectMode: 'Web' | 'Competitive Programming';
    cpSnippets?: string[];
}