type categoryItem = {
    id: string;
    name: string;
    picture: string;
    children: categoryItem;
    goods: Good[];
}[]
