class Download_list extends HTMLElement {
    constructor() {
        super();
        this.data_viower_header=[
            {Details:null,Provider:null,Price:null,Attribution:null}
        ]
        this.download_list;

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
    create_tr_html_content_object(download_row_object){
        var details=document.createElement('div');
        details.classList.add('Details');
        details.innerHTML=`
            <left-div class='center'>
                <c-icon src='${download_row_object['thump']}' size=90 ></c-icon>
            </left-div>
            <right-div class='center'>${download_row_object['name']}</right-div>
        `

        var Provider=document.createElement('div');
        Provider.classList.add('auther');
        Provider.innerHTML=`
            ${download_row_object['provider']}
        `       

        var Price=document.createElement('div');
        Price.classList.add('auther');
        Price.innerHTML=`
            ${download_row_object['price']}
        `       

        var Attribution=document.createElement('div');
        Attribution.classList.add('Attribution');    
        Attribution.innerHTML=`
            <div>
                <c-icon src='icons/downloads3.svg' size=100 ></c-icon>
                <right-div class='center'>Download</right-div>           
            </div>
        `              
        return {Details:details,Provider:Provider,Price:Price,Attribution:Attribution}  
    }


    async render_download_list(){
        this.children[1].children[0].render_table_header(this.data_viower_header)
        var tr_html_content_objects=[]
        for(var download_list_row of this.download_list){
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