import React from 'react'
import fire from './Firebase';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
        this.alarma=this.alarma.bind(this);
        this.writeDistancia=this.writeDistancia.bind(this);
        this.writeHumedad=this.writeHumedad.bind(this);
        this.writeLuz=this.writeLuz.bind(this);
        this.writeTemperatura=this.writeTemperatura.bind(this);
        this.state={
            loading:false,
            alarma :false,
            movimiento:false,
            temperatura: 50,
            luz:50,
            distancia:50,
            humedad:50,
            distanciatmp:50,
            temperaturatmp:50,
            luztmp:50,
            humedadtmp:50,
            
        }
        
        this.database=fire.database();

    }

    writeDistancia = (e) => {
        e.preventDefault();
        this.database.ref("Distancia").set(parseInt(this.state.distanciatmp))
      }
    writeTemperatura = (e) => {
        e.preventDefault();
        this.database.ref("Temperatura").set(parseInt(this.state.temperaturatmp))
        
    }

    writeHumedad = (e) =>{
        e.preventDefault();
        this.database.ref("Humedad").set(parseInt(this.state.humedadtmp))
    }

    writeLuz = (e) =>{
        e.preventDefault();
        this.database.ref("Luz").set(parseInt(this.state.luztmp))
    }

    componentDidMount(){
        this.setState({loading:true});
        this.dist=this.database.ref("Distancia");
        this.dist.on("value",snapshot => {
            this.setState({loading:false})
            this.setState({distancia:snapshot.val()})
            this.setState({distanciatmp:snapshot.val()})
        })
        this.dist=this.database.ref("Temperatura");
        this.dist.on("value",snapshot => {
            this.setState({loading:false})
            this.setState({temperatura:snapshot.val()})
            this.setState({temperaturatmp:snapshot.val()})
        })
        this.dist=this.database.ref("Humedad");
        this.dist.on("value",snapshot => {
            this.setState({loading:false})
            this.setState({humedad:snapshot.val()})
            this.setState({humedadtmp:snapshot.val()})
        })
        this.dist=this.database.ref("Luz");
        this.dist.on("value",snapshot => {
            this.setState({loading:false})
            this.setState({luz:snapshot.val()})
            this.setState({humedadtmp:snapshot.val()})
        })
        this.dist=this.database.ref("alarma");
        this.dist.on("value", snapshot => {        
            this.setState({loading:false})
            this.setState({alarma:snapshot.val()});
        })
    }
    

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value} );
    }

    logout(){
        fire.auth().signOut();
    }

    alarma(){
        
        this.database.ref("alarma").set(!this.state.alarma);
        
    }

    render(){
        return(
            <div>
                <h1>Bienvenido al sistema del hogar</h1>
                
                <div class="card text-center">
                    <div class="card-header">
                        <button type="button" className="btn btn-danger" onClick={this.logout}> logout</button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Sistema de alarma</h5>
                        <p class="card-text">{this.state.alarma? "El sistema está encendido" : "El sistema está apagado"}</p>
                        <button className={this.state.alarma? "btn btn-danger" : "btn btn-success"} onClick={this.alarma}>{this.state.alarma? "Apagar":"Encender"}</button>
                    </div>
                </div>

                <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Temperatura</h5>
                        <h1 class="card-text">{this.state.temperatura}ºc</h1>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col"><input type="text" className="form-control" name="temperaturatmp" onChange={this.handleChange}/></div>
                            <div className="col"></div>
                        </div>
                        <button class="btn btn-primary" onClick={this.writeTemperatura}>Insert</button>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Humedad</h5>
                        <h1 class="card-text">{this.state.humedad}%</h1>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col"><input type="text" className="form-control" name="humedadtmp" onChange={this.handleChange}/></div>
                            <div className="col"></div>
                        </div>
                        <button class="btn btn-primary" onClick={this.writeHumedad}>Insert</button>
                    </div>
                    </div>
                </div>
                </div>
            

                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Distancia</h5>
                            <h1 class="card-text">{this.state.distancia}cm</h1>
                            <div className="row">
                            <div className="col"></div>
                            <div className="col"><input name="distanciatmp" type="text" className="form-control" onChange={this.handleChange}/></div>
                            <div className="col"></div>
                        </div>
                            <button class="btn btn-primary" onClick={this.writeDistancia}>Insert</button>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Luz</h5>
                            <h1 class="card-text">{this.state.luz}</h1>
                            
                            <div className="row">
                                <div className="col"></div>
                                <div className="col"><input type="text" className="form-control" name="luztmp" onChange={this.handleChange}/></div>
                                <div className="col"></div>
                            </div>
                            <button class="btn btn-primary" onClick={this.writeLuz}>Insert</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Home;