import {RefAuthorDto} from '../../author/dto/ref-author.dto'

export interface BookFormDto {
    id?: string
    name?: string
    description?: string
    author?: RefAuthorDto
}
