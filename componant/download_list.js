class Download_list extends HTMLElement {
    constructor() {
        super();
        this.data_viower_header=[
            {Details:null,Author:null,License:null,Attribution:null}
        ]

        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.render_download_list()
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

    get_download_list(){
        return [
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
            {details:null,auther:'test',License:null,Attribution:null},
        ]
    }

    create_tr_html_content_object(download_row_object){
        var details=document.createElement('div');
        details.classList.add('Details');
        details.innerHTML=`
            <left-div class='center'>
                <c-icon src='icons/back.jpg' size=90 ></c-icon>
            </left-div>
            <right-div class='center'>Rong shdow From Athor Land in the City</right-div>
        `

        var auther=document.createElement('div');
        auther.classList.add('auther');
        auther.innerHTML=`
            freebick
        `       

        var License=document.createElement('div');
        License.classList.add('License');
        License.innerHTML=`
            <c-icon src='icons/downloads2.svg' size=64 ></c-icon>
            <right-div class='center'>Download licince</right-div>
        `       

        var Attribution=document.createElement('div');
        Attribution.classList.add('Attribution');    
        Attribution.innerHTML=`
            <div>
                <c-icon src='icons/downloads3.svg' size=100 ></c-icon>
                <right-div class='center'>Download</right-div>           
            </div>
        `              
        return {Details:details,Author:auther,License:License,Attribution:Attribution}  
    }


    async render_download_list(){
        this.children[1].children[0].render_table_header(this.data_viower_header)
        var download_list=await this.get_download_list()
        var tr_html_content_objects=[]
        for(var download_list_row of download_list){
           var tr_html_content_object =this.create_tr_html_content_object(download_list_row);
           tr_html_content_objects.push(tr_html_content_object)
        }
        this.children[1].children[0].render_table_data_chunk_html(tr_html_content_objects)
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
customElements.define('download-list', Download_list);