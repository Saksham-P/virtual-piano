import './Keyboard.css'

let mouseDown = false;
let whiteKeyWidth = 80
let pianoHeight = 400;
let allNaturalNotes;
let audioFiles;
let noteAudio;
const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharp = ["C", "D", "F", "G", "A"]
const naturalNotesFlat = ["D", "E", "G", "A", "B"]
const range = ["C2", "C7"];
    
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}

const handleMouseEnter = (e) => {
    if (mouseDown) {
        playNote(e.currentTarget.id);
    }
}

const handleMouseClick = (e) => {
    playNote(e.currentTarget.id);
}

const playNote = (note) => {
    let temp = "";
    if (note.includes('#')) {
        temp = `${note[2]}-${note[0].toLowerCase()}s`;
    }
    else {
        temp = `${note[1]}-${note[0].toLowerCase()}`;
    }
    // if (noteAudio !== undefined) {
    //     noteAudio.pause();
    // }
    noteAudio = new Audio(document.getElementById(temp).src);
    noteAudio.volume = 0.2;
    noteAudio.play();
    
}

function createKeyboard(){
    audioFiles = [];
    let keyboard = [];

    let whiteKeysPositionX = 0;
    for (let i = 0; i < allNaturalNotes.length; i++) {
        const key = (<g>
            <rect className='white-key' x={whiteKeysPositionX} y='0' width={whiteKeyWidth} height={pianoHeight}
        id={allNaturalNotes[i]} onMouseEnter={handleMouseEnter} onMouseDown={handleMouseClick}></rect>
            <text className='white-key-text' x={whiteKeysPositionX + whiteKeyWidth/2} y='380'
            textAnchor='middle'>{allNaturalNotes[i]}</text>
        </g>)
        whiteKeysPositionX += whiteKeyWidth;
        keyboard.push(key);

        const temp = `${allNaturalNotes[i][1]}-${allNaturalNotes[i][0].toLowerCase()}`;
        const audio = (
            <audio src={`../../audio/acousticGrandPiano/${temp}.wav`} key={allNaturalNotes[i]} id={temp} type="audio/wav"/>
        )
        audioFiles.push(audio);
    }

    let blackKeysPositionX = 60;
    allNaturalNotes.forEach((note, index, array) => {
        for (let i = 0; i < naturalNotesSharp.length; i++) {
            let naturalSharpNoteName = naturalNotesSharp[i];
            let naturalFlatNoteName = naturalNotesFlat[i];

            const key = (<g>
                <rect className='black-key' x={blackKeysPositionX} y='0' width={whiteKeyWidth/2} height={pianoHeight/1.6}
            id={`${naturalSharpNoteName}#${note[1]}`} onMouseEnter={handleMouseEnter} onMouseDown={handleMouseClick}></rect>
            <text className='black-key-text' x={blackKeysPositionX + whiteKeyWidth/4} y='215'
            textAnchor='middle'>{`${naturalSharpNoteName}♯`}</text>
            <text className='black-key-text' x={blackKeysPositionX + whiteKeyWidth/4} y='235'
            textAnchor='middle'>{`${naturalFlatNoteName}♭`}</text>
            </g>)

            if (naturalSharpNoteName === note[0]) {
                if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
                    blackKeysPositionX += whiteKeyWidth * 2;
                }
                else {
                    blackKeysPositionX += whiteKeyWidth;
                }
                if (index !== array.length - 1) {
                    keyboard.push(key);

                    const temp = `${note[1]}-${naturalSharpNoteName.toLowerCase()}s`;
                    const audio = (
                        <audio src={`../../audio/acousticGrandPiano/${temp}.wav`} key={`${naturalSharpNoteName}#${note[1]}`} id={temp} type="audio/wav"/>
                    )
                    audioFiles.push(audio);
                }
            }
        }
    });
    
    keyboard.map((keys) =>
        <li key={keys.toString()}>
            {keys}
        </li>
    );

    audioFiles.map((note) =>
        <li key={note.toString()}>
            {note}
        </li>
    );

    return keyboard;
}

function getAllNaturalNotes(firstNote, lastNote) {
    const firstNoteName = firstNote[0];
    const firstOctaveNumber = parseInt(firstNote[1]);
    const lastNoteName = lastNote[0];
    const lastOctaveNumber = parseInt(lastNote[1]);

    const firstNotePosition = naturalNotes.indexOf(firstNoteName);
    const lastNotePosition = naturalNotes.indexOf(lastNoteName);

    let numberOfKeys = (naturalNotes.length - firstNotePosition) + (lastNotePosition + 1);
    if ((lastOctaveNumber - firstOctaveNumber) - 1 > 0) {
        numberOfKeys += ((lastOctaveNumber - firstOctaveNumber) - 1) * naturalNotes.length;
    }

    allNaturalNotes = [];
    let octaveNumber = firstOctaveNumber;
    let notePosition = firstNotePosition;
    for (let i = 0; i < numberOfKeys; i++) {
        if (notePosition >= naturalNotes.length) {
            notePosition = 0;
            octaveNumber++;
        }
        allNaturalNotes.push(`${naturalNotes[notePosition++]}${octaveNumber}`);
    }
}

function Keyboard() {
    getAllNaturalNotes(range[0], range[1]);
    return (
        <div>
            <svg width='100%' viewBox={`0 0 ${allNaturalNotes.length*whiteKeyWidth} ${pianoHeight}`}>
                <g>
                    {createKeyboard()}
                </g>
            </svg>
            <div>
                {audioFiles}
            </div> 
        </div>
    );
}

export default Keyboard;