class Account_Part extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.handel_username_save_click()
            this.handel_email_save_click()
            this.handel_password_save_click()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <left-div>
                <top-div>
                    <c-icon src='/dashboard/icons/account.svg'  size='48'></c-icon>
                    <span class='center'>Personal Information</span>
                </top-div>
                <bottom-div>
                    <top-div class='center'>
                        <c-icon src='https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'  size='100'></c-icon>
                    </top-div>
                    <bottom-div>
                        <editable-info-line key='Username' value='ma7moudxyz@gmail.com' edite_button_text='Change'></editable-info-line>
                        <editable-info-line key='Email' value='ma7moudxyz@gmail.com' edite_button_text='Change'></editable-info-line>
                        <editable-info-line key='Password' value='*************' edite_button_text='Change'></editable-info-line>
                    </bottom-div>               
                </bottom-div>
            </left-div>
            <right-div>
                <top-div>
                    <c-icon src='/dashboard/icons/wallet.svg'  size='48'></c-icon>
                    <span class='center'>Wallet Information</span>               
                </top-div>
                <bottom-div>
                    <top-div class='center'>
                        <div class='center'>210 <span>EGB</span></div>
                    </top-div>
                    <bottom-div></bottom-div>
                </bottom-div>           
            </right-div>

        `       
    }

    handel_username_save_click(){
        this.children[0].children[1]
        .children[1].children[0]
        .addEventListener('save_click',async(e)=>{
            var edite_state=await this.send_edite_username(e.value)
            this.children[0].children[1].children[1].children[0].save_changes()
        })
    }

    handel_email_save_click(){
        this.children[0].children[1]
        .children[1].children[1]
        .addEventListener('save_click',(e)=>{
            e.currentTarget.save_changes()
        })

    }
    handel_password_save_click(){
        this.children[0].children[1]
        .children[1].children[2]
        .addEventListener('save_click',(e)=>{
            e.currentTarget.save_changes()
        })

    } 

    async send_edite_username(user_name){
        var respond=await fetch('/account/personal_information/edit_username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_name}),
        })
        respond=await respond.json()
        return respond
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
customElements.define('account-part', Account_Part);