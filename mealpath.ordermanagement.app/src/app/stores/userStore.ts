import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { UserRole } from "../models/UserRole";
import { UserList } from "../models/userList";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;
    usersList: UserList[]| null = null; 
    selectedUser: UserList|undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            window.location.href = '/';
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        window.location.href = '/';
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsersList = async () => {
        try{
            const usersList = await agent.Account.getAllUsers();
            this.usersList = usersList
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            var user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            window.location.href = '/categories';
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (30 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectUser = (id: string) => {
        this.selectedUser = this.usersList.find(x => x.userId === id);
    }

    cancelSelectedUser = () => {
        this.selectedUser = undefined;
    } 

    openForm = (id?: string) => {
        id ? this.selectUser(id) : this.cancelSelectedUser();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    updateUser = async (userRole: UserRole) => {
        this.loading = true;
        try{
            await agent.Account.addUserToRole(userRole);
            var user = this.usersList.find(u => u.userId == userRole.userId);
            this.usersList = [...this.usersList.filter(c => c.userId !== userRole.userId), user];
            this.selectedUser = user;
            this.editMode = false;
            this.loading = false;
            this.getAllUsersList()
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}