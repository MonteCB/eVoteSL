import {Injectable} from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() {
  }

  validateRegister(user) {
    if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateOperatorRegister(user) {
    if (user.name === undefined || user.poll_station === undefined || user.username === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateVoterRegister(user) {
    if (user.name === undefined || user.nic === undefined || user.district === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePollRegister(user) {
    if (user.booth_id === undefined || user.poll_station === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateCandidateRegister(user) {
    if (user.name === undefined || user.nic === undefined || user.party === undefined || user.candidate_no === undefined || user.email === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateCandidateUpdate(user) {
    
    if (user.name === undefined || user.nic === undefined || user.party === undefined || user.candidate_no === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateVoterUpdate(user) {
    
    if (user.name === undefined || user.nic === undefined || user.district === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateUserUpdate(user) {
    
    if (user.name === undefined || user.username === undefined || user.email === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateChangePwd(user) {
    
    if (user.password === undefined || user.new_password === undefined || user.c_password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateConfPwd(user) {
    
    if (user.c_password != user.new_password) {
      return false;
    } else {
      return true;
    }
  }



  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
