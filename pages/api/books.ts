import type {NextApiRequest, NextApiResponse} from 'next'

const booksDB: Books[] = [
    {id: 1, title: 'Book 1'},
    {id: 2, title: 'title'},
    {id: 3, title: 'Book 2'},
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Books[]>
) {
    if (req.method === 'GET') {
        let books = booksDB

        const term = req.query.term as string

        if(term) {
            books = books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()))
        }
        res.status(200).json(books)
    }
}
type Books = {
    id: number
    title: string
}

type Data = {
    name: string
}
