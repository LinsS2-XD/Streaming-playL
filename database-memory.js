import { randomUUID } from "crypto"


export class DatabaseMemory{
    #playlists = new Map()

list(search){
    return Array.from(this.#playlists.entries()).map((playlistArray) => {
        const id = playlistArray[0]

        const data = playlistArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(playlist => {
        if (search){
        return playlist.titulo.includes(search)
        }
        return true
    })
}

    create(playlist){
        const playlistId = randomUUID()
        this.#playlists.set(playlistId, playlist)
    }
    
    update(id, playlist){
        this.#playlists.set(id, playlist)
    }

    delete(id, playlist){
        this.#playlists.delete(id, playlist)
    }
}