export class User {
    _uid: string;
    _email: string;
    _photoURL: string;
    _name: string;
    _surname?: string;
    _age?: string;
    _sexo?:string;
    _alergias?: string;
    _observacionesMedicas?: string;
    _infoAdicional?: string;
  
    constructor(json) {
      if (json) {
        Object.assign(this, json);
      }
    }
  
    get uid(): string {
      return this._uid;
    }
  
    set uid(value: string) {
      this._uid = value;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(value: string) {
      this._email = value;
    }
  
    get photoURL(): string {
      return this._photoURL;
    }
  
    set photoURL(value: string) {
      this._photoURL = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }

    get surname(): string {
        return this._surname;
      }
    
    set surname(value: string) {
        this._surname = value;
    }

    get age(): string {
        return this._age;
      }
    
    set age(value: string) {
        this._age = value;
    }

    get sexo(): string {
        return this._sexo;
      }
    
    set sexo(value: string) {
        this._sexo = value;
    }
    get alergias(): string {
        return this._alergias;
      }
    
    set alergias(value: string) {
        this._alergias = value;
    }

    get observacionesMedicas(): string {
        return this._observacionesMedicas;
      }
    
    set observacionesMedicas(value: string) {
        this._observacionesMedicas = value;
    }

    get infoAdicional(): string {
        return this._infoAdicional;
      }
    
    set infoAdicional(value: string) {
        this._infoAdicional = value;
    }
  }
  