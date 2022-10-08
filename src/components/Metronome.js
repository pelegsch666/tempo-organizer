import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, DivForMetronome, DivNoForm } from './styles/StyledComponents'
import Timer from '../dataObjects/timer'
import {howl,howler} from 'howler'


const DivForSettings = styled.div`
display: flex;

justify-content: space-between;
align-items: center;
`
const SpanDisplay = styled.div`
display: flex;
justify-items: center;
text-align: center;
`
const DivForInfo = styled.div`
display: flex;
justify-items: center;
text-align: center;
`

const click1 = new Audio('./audio/click1.mp3')
const click2 = new Audio('./audio/click2.mp3')
let isRuning = false
function handleSubmit() {

    click1.play()

    if (!isRuning) {

        isRuning = true;

    } else {
        //metronome.stop();
        isRuning = false;

    }
}

    



function Metronome() {
    const [bpm, setBpm] = useState(50)
    const [count, setCount] = useState(4)
    const [audioUrlFirst, setAudioUrlFirst] = useState('./audio/click1.mp3')
    const [audioUrlSecond, setAudioUrlSecond] = useState('./audio/click2.mp3')

    const [sound, setSound] = useState();

    const KICK_URL = '../audio/click1.mp3';
	const audioContext = new AudioContext();

	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(0.5, 0);
	gainNode.connect(audioContext.destination);

	async function handleClick() {
		console.log('hey')
        const response = await fetch(KICK_URL);
		const soundBuffer = await response.arrayBuffer();
		const kickBuffer = await audioContext.decodeAudioData(soundBuffer);
		const kickSource = audioContext.createBufferSource();
		kickSource.buffer = kickBuffer;
		kickSource.connect(gainNode);
        audioContext.resume()
        kickSource.start()
        
        ;}
    
    
   



    function setLimitToCount(e) {
        console.log(e.target.childNodes[0].data)
        if (e.target.childNodes[0].data === '+') {
            if (count >= 2 && count <= 11) {
                setCount(count + 1)
            } else {
                return
            }

        }
        if (e.target.childNodes[0].data === '-') {
            if (count >= 3 && count <= 12) {
                setCount(count - 1)
            } else {
                return
            }
        }
    }
    //const metronome = new Timer(playClick, 60000 / bpm, {immediate: true})







    return (
        <DivNoForm>
            Metronome
            <DivForMetronome>
                <DivForSettings>
                    <SpanDisplay>{bpm} Bpm</SpanDisplay>
                </DivForSettings>
                <DivForSettings >
                    <div>-</div>
                    <input type="range" min="20" max="280" step="1" onChange={(e) => setBpm(e.target.valueAsNumber)} />
                    <div>+</div>
                </DivForSettings>
                <Button onClick={() =>  handleClick() }>Start</Button>
                <DivForSettings>
                    <div onClick={(e) => setLimitToCount(e)}>-</div>
                    <div>Count:{count}</div>
                    <div onClick={(e) => setLimitToCount(e)}>+</div>
                </DivForSettings>
            </DivForMetronome>
        </DivNoForm>
    )
}

export default Metronome