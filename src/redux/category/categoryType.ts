export interface ICategoryState {
    name: string;
    icon: string;
}

export interface CategoryModelResponse {
    id: number;
    name: string;
    icon: string;
}

export interface CategoriesResponse {
    data: CategoryModelResponse[];
    message: string;
    success: boolean;
}
