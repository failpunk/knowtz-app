export default class Supabase {
  constructor(supabaseUrl, supabasePubkey) {
    this.supabaseUrl = supabaseUrl
    this.supabasePubkey = supabasePubkey
  }

  requestOptions(method = 'GET') {
    let myHeaders = new Headers()
    myHeaders.append('apikey', this.supabasePubkey)
    myHeaders.append('Authorization', `Bearer ${this.supabasePubkey}`)

    return {
      method,
      headers: myHeaders,
      redirect: 'follow',
    }
  }

  async select(table) {
    const url = this.supabaseUrl + `/rest/v1/${table}`

    const response = await fetch(url, this.requestOptions('GET')).catch((error) => console.log('Supabase select error', error))
    return response.json()
  }

  async getNotes() {
    return this.select('note')
  }
}
