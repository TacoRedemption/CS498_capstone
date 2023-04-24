import React, { useEffect, useState } from 'react'
import WithNavigation from './with/with-navigation';
import { client } from '../client';

const Dashboard = () => {


    const [postsPerArtform, setPostsPerArtform] = useState({});
    const [artformsCount, setArtformsCount] = useState(0);

    useEffect(() => {
        client.fetch(`array::unique(*[_type == 'post'].artform)`)
            .then(artforms => {
                const artformsCount = artforms.length;

                return client.fetch('{' + artforms
                    .map(artform => `"${artform}": count(*[_type == 'post' && artform == "${artform}"])`)
                    .join(',') + '}'
                ).then(postsPerArtform => ({
                    postsPerArtform,
                    artformsCount,
                }));
            })
            .then(result => {
                setPostsPerArtform(result.postsPerArtform);
                setArtformsCount(result.artformsCount);
            });

    }, [])


    return <>
        <WithNavigation>
            <div>
                <div>Categories: {artformsCount}</div>
                <table >
                    <thead>
                        <tr>
                            <th>
                                Category
                            </th>
                            <th>
                                Count
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(postsPerArtform).map(entry => {
                            return <tr>
                                <td>
                                    {entry[0]}
                                </td>
                                <td>
                                    {entry[1]}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <button 
            type="button"
            className=" bg-white p-2  rounded-full  shadow-md"
            >
                ADD NEW ARTFORM
            </button>
        </WithNavigation>

    </>;

}

export default Dashboard