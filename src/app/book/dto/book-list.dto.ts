import {RefAuthorDto} from "../../author/dto/ref-author.dto";

export interface BookListDto {
    id: string
    name: string
    author: RefAuthorDto
}
