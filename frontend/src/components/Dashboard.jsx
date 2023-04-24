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


    return <WithNavigation>
        <div className='border p-2 rounded shadow-lg text-center'>
            <p className='text-3xl font-bold uppercase text-gray-800'>
                Categories
            </p>
            <p className='text-xl mt-2'>{artformsCount}</p>
        </div>
        <table className='table-auto text-left w-full my-12'>
            <thead className='uppercase'>
                <tr className='border-b border-b-4'>
                    <th className='pt-2 pb-2'>
                        Category
                    </th>
                    <th className='pt-2 pb-2'>
                        Count
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(postsPerArtform).map((entry, index) => {
                    return <tr className={0 == index % 2 ? '' : 'bg-gray-100'}>
                        <td className='pt-2 pb-2'>
                            {entry[0]}
                        </td>
                        <td className='pt-2 pb-2'>
                            {entry[1]}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </WithNavigation>;

}

export default Dashboard