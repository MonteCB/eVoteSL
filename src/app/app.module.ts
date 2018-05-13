import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {HttpModule} from '@angular/http';
import {AuthGuard} from './guards/auth.guard';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainComponent} from './components/main/main.component';
import {RegCandidateComponent} from './components/reg-candidate/reg-candidate.component';
import {RegVoterComponent} from './components/reg-voter/reg-voter.component';
import {PollingBoothComponent} from './components/polling-booth/polling-booth.component';
import {BallotComponent} from './components/ballot/ballot.component';
import {AuthenticateComponent} from './components/authenticate/authenticate.component';
import {VoteComponent} from './components/vote/vote.component';
import {ElectionComponent} from './components/election/election.component';
import { CreateBoothComponent } from './components/create-booth/create-booth.component';
import { AddPartyComponent } from './components/add-party/add-party.component';
import { VoterDetailsComponent } from './components/voter-details/voter-details.component';
import { CandidateDetailsComponent } from './components/candidate-details/candidate-details.component';
import { BoothLoginComponent } from './components/booth-login/booth-login.component';
import { MainElectionComponent } from './components/main-election/main-election.component';
import { ViewResultsComponent } from './components/view-results/view-results.component';
import { PollWorkerLoginComponent } from './components/poll-worker-login/poll-worker-login.component';
import { PollOperatorRegisterComponent } from './components/poll-operator-register/poll-operator-register.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'results', component: ViewResultsComponent},
  // {path: 'authenticate', component: AuthenticateComponent},
  // {path: 'poll_worker_login', component: PollWorkerLoginComponent},
  // {path: 'poll_login', component: PollingBoothComponent},
  // {path: 'booth_login', component: BoothLoginComponent},
  {path: 'dashboard', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'regcandidate', component: RegCandidateComponent},
      {path: 'regvoter', component: RegVoterComponent},
      {path: 'voter_detail', component: VoterDetailsComponent},
      {path: 'regpollOperator', component: PollOperatorRegisterComponent},
      {path: 'candidate_detail', component: CandidateDetailsComponent},
      {path: 'add_party', component: AddPartyComponent},
      {path: 'election', component: ElectionComponent},
      {path: 'create_booth', component: CreateBoothComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {path: 'poll_login', component: MainElectionComponent,  children: [
    {path: '', component: PollingBoothComponent},
    {path: 'ballot', component: BallotComponent},
    {path: 'vote', component: VoteComponent},
    {path: 'poll_worker_login', component: PollWorkerLoginComponent},
    {path: 'authenticate', component: AuthenticateComponent},
    {path: 'booth_login', component: BoothLoginComponent}
  ]}
  
  
    
  // should be protected
  // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}       // should be protected
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    MainComponent,
    RegCandidateComponent,
    RegVoterComponent,
    PollingBoothComponent,
    BallotComponent,
    AuthenticateComponent,
    VoteComponent,
    ElectionComponent,
    CreateBoothComponent,
    AddPartyComponent,
    VoterDetailsComponent,
    CandidateDetailsComponent,
    BoothLoginComponent,
    MainElectionComponent,
    ViewResultsComponent,
    PollWorkerLoginComponent,
    PollOperatorRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()

  ],
  providers: [ValidateService, AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
