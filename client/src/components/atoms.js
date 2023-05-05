import {atom} from 'recoil';

export const tripsAtom = atom({
    key:'trips',
    default: [],
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
          console.log('tripsAtom updated:', setSelf);
          onSet(newTrips => {
            console.log('tripsAtom new value:', newTrips);
          });
          
        }
    ]
});
