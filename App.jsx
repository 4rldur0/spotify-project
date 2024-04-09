import React, { useState } from "react";
import { Button, Carousel, Input, Select, Space } from 'antd';

export default function App() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('album');
    const [limit, setLimit] = useState(1);
    const options = [
        { value: 'album', label: 'album' },
        { value: 'track', label: 'track' },
        { value: 'artist', label: 'artist' },
    ];
    const carouselStyles = {
        "width": "640px",
        "margin": "auto"
    };

    async function fetchData() {
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=${type}&limit=${limit}`;
        const request = await fetch(url);
        const responseData = await request.json();
        setData(responseData);
        console.log(responseData);
    }

    function jsonToJSX(JSON) {
        return (
            <div key={JSON.id}>
                <iframe
                    key={JSON.id}
                    src={`https://open.spotify.com/embed/${type}/${JSON.id}?utm_source=generator`}
                    width="100%"
                    border="0"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </div>
        )
    }

    return (
        <div>
            <header>
                <h1> Spotify Demo </h1>
            </header>
            <main>
                <div>
                    <Space direction="vertical" size="middle">
                        <Space.Compact size="large">
                            <Select style={{ width: '18%' }} defaultValue="album" onChange={value => setType(value)} options={options} />
                            <Input style={{ width: '12%' }} type="number" defaultValue={1} onChange={e => setLimit(e.target.value)} placeholder="Limit" />
                            <Input style={{ width: '70%' }} onChange={e => setSearchTerm(e.target.value)} placeholder="Search Term" />
                            <Button onClick={fetchData}>Search</Button>
                        </Space.Compact>
                    </Space>
                </div>
                <div style={carouselStyles}>
                    <Carousel dotPosition="top">
                        {
                            data.map(jsonToJSX)
                        }
                    </Carousel>
                </div>
            </main>
        </div >
    );
}
