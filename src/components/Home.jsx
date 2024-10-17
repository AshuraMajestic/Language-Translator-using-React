import React, { useEffect, useState } from 'react'
import Nav from './nav'
import axios from 'axios';

export default function Home() {
    const [englishText, setEnglishText] = useState('');
    const [hindiText, setHindiText] = useState('');
    useEffect(() => {
        if (englishText) {
            translateText();
        } else {
            setHindiText('');
        }
    }, [englishText]);


    const translateText = async () => {
        const translateFrom = 'en-GB';
        const translateTo = 'hi-IN';
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=${translateFrom}|${translateTo}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.responseData) {
                setHindiText(response.data.responseData.translatedText);
            }
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };
    return (
        <>
            <Nav />
            <div className='mt-16 h-full'>
                <div className="grid grid-cols-2 gap-x-16 mx-16 justify-center items-center">
                    <div className='h-80 text-2xl font-bold'>
                        English
                        <div className='h-full border-4 border-black mt-4 p-4'>
                            <textarea
                                className='w-full h-full'
                                value={englishText}
                                onChange={(e) => setEnglishText(e.target.value)}
                                placeholder='Enter text in English'
                            />
                        </div>
                    </div>
                    <div className='h-full text-2xl font-bold'>
                        Hindi
                        <div className='h-full border-4 border-black mt-4 p-4'>
                            <textarea
                                className='w-full h-full'
                                value={hindiText}
                                readOnly
                                placeholder='Translation in Hindi will appear here'
                            />
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}
