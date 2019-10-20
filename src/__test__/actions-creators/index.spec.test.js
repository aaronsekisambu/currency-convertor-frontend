import axios from "axios";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userLogin } from "../../redux/action-creators/index";

const mockStore = configureStore([thunk]);
const store = mockStore();

describe("Test all action creators in the index file", () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });
  it("should login social user from facebook", () => {
    const userData = {
      accessToken: "123njnskdnh3n",
      provider: "facebook"
    };
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: {
            message: "Welcome back Aaron",
            token: "thisIsAToken01",
            ...userData
          }
        }
      });
      console.log(request);
      return store.dispatch(userLogin(userData)).then(() => {
        expect(store.getActions().length).toBe(1);
        console.log('here,hb');
      })
    });
  });
});
