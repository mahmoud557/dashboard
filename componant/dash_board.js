class Dash_Board extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;
        this.account_data;
    }

    async firest_connect(){
        if(!this.firest_connect_state){
            await this.get_account_data()
            console.log(this.account_data)
            this.render()
            this.create_hestory_part()
            this.create_download_list()
            this.create_account_part()
            this.hid_all_parts_and_show_by_defult()
            this.set_active_to_nav_button_for_fires_time()
            this.set_active_to_nav_button()
            this.handel_avatar_click()
            this.handel_avatar_button_click()
            this.handel_logo_click()
            this.go_to_viow_if_exest_in_location()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <top-div class='center'>
                <left-div class='center'>
                    <c-icon src='/dashboard/icons/logo2.png'  size='80'></c-icon>
                </left-div>               
                <right-div class='center'>
                    <c-icon src='${this.account_data.picture}'></c-icon>
                    <in-out-slider>
                        <div class='center' button_key='Account'>
                            <c-icon src='/dashboard/icons/account.svg'  size='40'></c-icon>
                            <span>Account</span>                        
                        </div>
                        <div class='center' button_key='Downloads'>
                            <c-icon src='/dashboard/icons/downloads.svg'  size='40'></c-icon>
                            <span>Downloads</span>                            
                        </div>
                        <div class='center' button_key='Orders'>
                            <c-icon src='/dashboard/icons/history.svg'  size='40'></c-icon>
                            <span>Orders</span>                           
                        </div>
                        <div class='center' button_key='Help'>
                            <c-icon src='/dashboard/icons/help.svg'  size='40'></c-icon>
                            <span>Help</span>                           
                        </div>
                        <div class='center'>
                            <c-icon src='/dashboard/icons/log_out.svg'  size='40'></c-icon>
                            <span>Sign Out</span>                           
                        </div>                       
                    </in-out-slider>
                </right-div>
            </top-div>
            <layers-holder-head class='center' target_id='main_layer_holder'>
                <div layer_target='Account' class='center'>
                    <c-icon src='/dashboard/icons/account.svg'  size='50'></c-icon>
                    <span>Account</span>  
                </div>

                <div layer_target='Downloads' class='center'>
                    <c-icon src='/dashboard/icons/downloads.svg'  size='50'></c-icon>
                    <span>Downloads</span>
                </div>

                <div layer_target='Orders' class='center'>
                    <c-icon src='/dashboard/icons/history.svg'  size='50'></c-icon>
                    <span>Orders</span>
                </div>

                <div layer_target='Help' class='center'>
                    <c-icon src='/dashboard/icons/help.svg'  size='50'></c-icon>
                    <span>Help</span>
                </div>
            </layers-holder-head>          
            <bottom-div class='center'>
                <layers-holder id='main_layer_holder' in_show='Account' class='center'>

                </layers-holder>               
            </bottom-div>
        `       
    }


    async get_account_data(){
        try{
            var respond=await fetch('/dashboard/get_account_data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            respond=await respond.json()
            this.account_data=respond;
            console.log(10,respond)
        }catch(err){
            console.log(err)
        }
    }

    create_account_part(){
        this.account_part=document.createElement('account-part')
        this.account_part.account_data=this.account_data;
        this.account_part.setAttribute('layer_id','Account')
        this.account_part.setAttribute('display','flex')
        this.children[2].children[0].appendChild(this.account_part)
    }

    create_hestory_part(){
        this.hestory_part=document.createElement('hestory-part')
        this.hestory_part.order_list=this.account_data.order_list;
        this.hestory_part.setAttribute('layer_id','Orders')
        this.hestory_part.setAttribute('display','flex')
        this.children[2].children[0].appendChild(this.hestory_part)
    }

    create_download_list(){
        this.download_list=document.createElement('download-list')
        this.download_list.download_list=this.account_data.download_list;
        this.download_list.setAttribute('layer_id','Downloads')
        this.download_list.setAttribute('display','flex')
        this.children[2].children[0].appendChild(this.download_list)
    }

    hid_all_parts_and_show_by_defult(){
        this.children[2].children[0].hid_all()
        this.children[2].children[0].show_by_defult()
    }

    go_to_viow_if_exest_in_location(){
        var viow_key= window.location.hash;
        if(viow_key){
            document.querySelector(`[layer_target='${viow_key.slice(6)}']`).click()
        }
        history.replaceState(null, null, ' ');
    }

    handel_avatar_click(){
        this.children[0].children[1].children[0]
        .addEventListener('click',()=>{
            var slide_state= this.children[0].children[1].children[1].slide_state;
            switch(slide_state){
                case "in":
                    this.children[0].children[1].children[1].slide_out('234','c')
                    break;
                case "out":
                    this.children[0].children[1].children[1].slide_in('b_to_t')
                    break;                  
            }
        })
    }

    handel_logo_click(){
        this.children[0].children[0].children[0]
        .addEventListener('click',()=>{
            window.location.href = '/';
        })
    }

    handel_avatar_button_click(){
        for(var childern of this.children[0].children[1].children[1].children){
            childern.addEventListener('click',async(e)=>{
                var button_key=e.currentTarget.getAttribute('button_key');
                if(button_key){
                    document.querySelector(`[layer_target='${button_key}']`).click()
                }else{
                     await this.send_log_out()
                }
            })
        }
    }

    async send_log_out(){
        var respond=await fetch('/manager_users/log_out', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        respond=await respond.json()
        if(respond.logout_state){window.location.href = `/`}
    }   

    set_active_to_nav_button(){ 
        for(var child of this.children[1].children){
            child.addEventListener('click',(e)=>{
                this.active_nav_button.classList.remove('active')
                this.active_nav_button=e.currentTarget
                this.active_nav_button.classList.add('active')
            })
        }
    }

    set_active_to_nav_button_for_fires_time(){
        this.active_nav_button=this.children[1].children[0];
        this.active_nav_button.classList.add('active')
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
customElements.define('dash-board', Dash_Board);