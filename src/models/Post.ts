export interface Post {
    _id: number;
    user: string,
    title: string,
    description: string,
    image: string,
    version: number,
    views: number,
    likes: number,
    dislikes: number,
    enabled: boolean;
}
