import React, { useEffect, useRef, useState } from 'react'
import WithNavigation from './with/with-navigation';
import { client } from '../client';
import { Chart, registerables } from 'chart.js';

const Dashboard = () => {
    const [postsPerArtform, setPostsPerArtform] = useState({});
    const [artformsCount, setArtformsCount] = useState(0);
    const canvas = useRef();

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
    }, []);

    useEffect(() => {
        if (canvas.current) {
            Chart.register(...registerables);
            const labels = Object.keys(postsPerArtform);
            const data = labels.map(label => postsPerArtform[label]);
            const chart = new Chart(canvas.current, {
                type: 'bar',
                data: {
                    labels, 
                    datasets: [{
                        label: 'Count Per Category',
                        data,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            return () => chart.destroy();
        }
    }, [canvas, postsPerArtform]);


    return <WithNavigation>
        <div className='border p-2 rounded shadow-lg text-center'>
            <p className='text-3xl font-bold uppercase text-gray-800'>
                Artforms
            </p>
            <p className='text-xl mt-2'>{artformsCount}</p>
        </div>
        <table className='table-auto text-left w-full my-12'>
            <thead className='uppercase'>
                <tr className='border-b border-b-4'>
                    <th className='pt-2 pb-2'>
                        Artform
                    </th>
                    <th className='pt-2 pb-2'>
                        Count
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(postsPerArtform).map((entry, index) => {
                    return <tr key={entry} className={0 == index % 2 ? '' : 'bg-gray-100'}>
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

        <div>
            <canvas ref={canvas}></canvas>
        </div>
    </WithNavigation>;

}

export default Dashboard