import { Swipe, SwipeItem,Button,Icon,Popup,Form, Field, CellGroup  } from 'vant';
let plugins = [
    Swipe, SwipeItem,Button,Icon ,Popup,Form, Field, CellGroup
]

export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item);
    })
}