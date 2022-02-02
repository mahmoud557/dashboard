class Editable_Info_line extends HTMLElement {
    constructor() {
        super();
        this.key=this.getAttribute('key');
        this.value=this.getAttribute('value');
        this.edite_button_text=this.getAttribute('edite_button_text');
        this.save_click_event=new Event('save_click')
        this.firest_connect_state=false;     
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.handel_change_click()
            this.handel_cancle_click()
            this.handel_save_click()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <left-div>${this.key} : </left-div>
            <right-div title='${this.value}'  spellcheck="false">${this.value}</right-div>
            <div class='edit_button '>${this.edite_button_text}</div>
            <div class='save_button hid'>Save</div>
            <div class='cancle_button hid'>Cancle</div>

        `
    }

    set_value(){
        this.children[1].textContent=this.value;
        this.children[1].title=this.value;
    }

    connectedCallback(){ 
        this.firest_connect()
    }

    handel_change_click(){
        this.children[2].addEventListener('click',(e)=>{
            this.children[1].setAttribute('contenteditable','true')
            this.children[1].classList.add('on_edit')
            this.children[1].focus()
            e.currentTarget.classList.add('hid')
            this.children[3].classList.remove('hid')
            this.children[4].classList.remove('hid')
        })
    }  

    handel_cancle_click(){
        this.children[4].addEventListener('click',(e)=>{
            this.children[1].textContent=this.value;
            this.children[1].setAttribute('contenteditable','false')
            this.children[1].classList.remove('on_edit')
            this.children[2].classList.remove('hid')
            this.children[3].classList.add('hid')
            this.children[4].classList.add('hid')
        })
    }

    handel_save_click(){
        this.children[3].addEventListener('click',async(e)=>{
           this.save_click_event.value=this.children[1].textContent;
           this.dispatchEvent(this.save_click_event)
        })
    }

    togel_edx

    save_changes(){
        this.value=this.children[1].textContent;
        this.children[1].setAttribute('contenteditable','false')
        this.children[1].classList.remove('on_edit')
        this.children[2].classList.remove('hid')
        this.children[3].classList.add('hid')
        this.children[4].classList.add('hid')
    }

    run_on_Attribute_change(attribute_name){
        if(this.firest_connect_state){
            if(attribute_name=='value'){
                this.set_value()
            }
        } 
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)
    } 
    static get observedAttributes() { return ['value']; }
           
}
customElements.define('editable-info-line', Editable_Info_line);