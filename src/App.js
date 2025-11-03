import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJ_Controls from './components/DJ_Controls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }



// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     // if (document.getElementById('flexRadioDefault2').checked) {
//     //     replace = "_"
//     // }

//     return replace
// }


function changeCPMValue(currentCPM, setSongText, keepOriginalText){
    const textAreaElement = document.getElementById("proc");
    if (!textAreaElement) return;
    
    const currentText = keepOriginalText.current || "";
    
    const updatedText = currentText.replaceAll("{CPM}", currentCPM);
    // change textarea
    textAreaElement.value = updatedText;
    
    setSongText(updatedText);
    if (globalEditor && typeof globalEditor.setCode === "function") {
        globalEditor.setCode(updatedText);
    }
}

export default function StrudelDemo() {
    
const handlePlayEvent = () => {
    globalEditor.evaluate()
}

const handleStopEvent = () => {
    globalEditor.stop()
}

const [songText, setSongText] = useState(stranger_tune)
const keepOriginalText = useRef(stranger_tune);
const hasRun = useRef(false);

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune

        const cpmTextInput = document.getElementById("cpm_text_input");
        
        let changeWhenType = null;

        if (cpmTextInput && !cpmTextInput.dataset.bound){
            cpmTextInput.addEventListener("input", () => {
          const value = cpmTextInput.value.trim();

          clearTimeout(changeWhenType);

          changeWhenType = setTimeout(() => {
            changeCPMValue(value, setSongText, keepOriginalText);
          }, 500)
        });

        cpmTextInput.dataset.bound = "true";
        }
    }
    globalEditor.setCode(songText);
}, [songText]);

return (
    <div className='App'>
        <main>
            {/* top left area */}
            <h2 className=" dj-label-container text-white text-center">Strudel Demo</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div className="dj-section-border mb-3 p-3">
                            <PreprocessTextArea defaultValue={songText} onChange={e => setSongText(e.target.value)} />
                        </div>
                    </div>

          <div className="col-md-4 d-flex flex-column">
            <div className="dj-section-border p-3 mb-3">
      <div className="dj-label-container mb-3 text-white"> Buttons </div>              
        <div className="d-flex flex-wrap gap-3 justify-content-center">
                <ProcButtons />
                <PlayButtons onPlay={handlePlayEvent} onStop={handleStopEvent} />
              </div>
            </div>
          </div>
          </div>

          {/* strudel code area */}
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                         <div className="dj-section-border p-3 mb-3">
                         <div className="dj-label-container mb-3 text-white">Strudel Code</div>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                </div>

             {/* DJ controls */}
               <div className="col-md-4">

             <div className="dj-section-border p-3">
                 <div className="dj-label-container mb-3 text-white">Controls</div>
                    <div className="col-md-4">
                        <DJ_Controls/>
                    </div>
                </div>
             </div>
            </div>
            </div>
            <canvas id="roll"></canvas>
        </main>
    </div >
);


}