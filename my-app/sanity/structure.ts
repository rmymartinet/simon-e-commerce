import type { StructureResolver } from 'sanity/structure'
import { DocumentIcon, UserIcon, TagIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Articles')
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title('Articles')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Auteurs')
        .icon(UserIcon)
        .child(
          S.documentList()
            .title('Auteurs')
            .filter('_type == "author"')
        ),
      S.listItem()
        .title('Tags')
        .icon(TagIcon)
        .child(
          S.documentList()
            .title('Tags')
            .filter('_type == "tag"')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'author', 'tag'].includes(listItem.getId() || '')
      ),
    ])
