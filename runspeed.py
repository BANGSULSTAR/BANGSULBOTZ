import speed

def run_speedtest():
    try:
        st = speed.Speedtest()
        servers = st.get_servers()  # Ambil semua server yang tersedia

        # Gunakan semua server yang tersedia
        best_server = st.get_best_server()  # Pilih server terbaik dari semua server yang tersedia

        # Tampilkan informasi server yang dipilih
        print("╔═» *SPEEDTEST RESULTS*")
        print("╠════════════〇")
        print(f"╠» *Server host* :")
        print(f"╠» {best_server['host']}")
        print(f"╚» *Lokasi server*   : {best_server['country']}\n")

        # Lakukan pengujian kecepatan download dan upload
        download_speed = st.download()
        upload_speed = st.upload()
        ping = best_server['latency']

        # Tampilkan hasil uji kecepatan
        return (
            f"╔═» *Hasil Pengujian Kecepatan*\n"
            f"╠═══════════════〇\n"
            f"╠» *Download Speed* : {download_speed / 1_000_000:.2f} Mbps\n"
            f"╠» *Upload Speed*       : {upload_speed / 1_000_000:.2f} Mbps\n"
            f"╚» *Ping*                          : {ping} ms\n"
        )
    except Exception as e:
        return f"Speedtest gagal: {e}"

if __name__ == "__main__":
    print(run_speedtest())
