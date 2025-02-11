const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk'); // Mengimpor chalk

// Tangani uncaughtException dan unhandledRejection
process.on('uncaughtException', (err) => {
    console.error(chalk.red('Terjadi error yang tidak tertangani:', err));
    // Lakukan tindakan pembersihan atau logging jika diperlukan
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:', promise, 'reason:', reason));
});

// Misalkan global.owner sudah didefinisikan sebelumnya
//const owner = global.owner;

function start() {
    console.log(chalk.green('Bot sedang dimulai...')); // Menggunakan warna hijau
    
    let args = [path.join(__dirname, 'index.js'), ...process.argv.slice(2)];
    let p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    }).on('message', data => {
        if (data === 'reset') {
            console.log(chalk.yellow('Bot akan di-restart dalam 1 jam ke depan.')); // Menggunakan warna kuning
            p.kill();
            start();
            delete p;
        }
    }).on('exit', code => {
        console.error(chalk.red('Bot keluar dengan kode:', code)); // Menggunakan warna merah
        if (code === 0 || code === 1) {
            console.log(chalk.blue('Bot sudah di-restart.')); // Menggunakan warna biru
            start();
        }
    });

    // Fungsi untuk menghentikan bot setelah 2 jam
    setTimeout(() => {
        console.log(chalk.cyan('Bot akan di-restart setelah 2 jam runtime.')); // Menggunakan warna cyan
        
        p.kill();
    }, 2 * 60 * 60 * 1000); // 2 jam dalam milidetik
}

start();
