import app from './src/app';
import config from './src/config';

const PORT = config.SERVER.PORT;
app.listen(PORT, () => console.log('Server is listening on PORT', PORT));
