import React, { useEffect } from 'react'
import { useStateValue } from '../../state'

const Home = () => {
    const [{ user }, dispatch] = useStateValue()

    const fetchInstagramUser = async username => {
        const url =`http://167.99.121.93:5000/instagram?username=${username}`
        try {
            const data = await fetch(url)
            const json = await data.json()
            dispatch({
                type: 'user',
                payload: json
            })
            console.log(json)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
    fetchInstagramUser('jamesthomasvision')
    },[])

    return (
        <p>Stuff</p>
    )
}

export default Home