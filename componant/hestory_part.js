class Hestory_part extends HTMLElement {
    constructor() {
        super();
        this.data_viower_header=[
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true},
        {Product:10,Reference:20,Date:'kkkk',Amount:'aaa',status:true}
        ]
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.render_data_viower_header()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <top-div></top-div>
            <bottom-div>
                <data-viower></data-viower>
            </bottom-div>
        `       
    }

    render_data_viower_header(){
        this.children[1].children[0].render_table_header(this.data_viower_header)
        this.children[1].children[0].render_table_data_chunk_text(this.data_viower_header)
    }

    run_on_Attribute_change(name){
        if(this.firest_connect_state){
            return      
        }
    }

    connectedCallback(){ 
        this.firest_connect()           
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)

    } 
    static get observedAttributes() { return []; } 
           
}
customElements.define('hestory-part', Hestory_part);