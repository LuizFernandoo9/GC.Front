
export class BufferLoader{
    static loadBuffer(){
        window.Buffer = require('buffer').Buffer;
    }
}