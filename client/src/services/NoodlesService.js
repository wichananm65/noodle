import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('noodles', {
            params: {
                search: search
            }
        })
    },
    show(noodleId) {
        return Api().get('noodle/' + noodleId)
    },
    post(noodle) {
        return Api().post('noodle', noodle)
    },
    put(noodle) {
        return Api().put('noodle/' + noodle.id, noodle)
    },
    delete(noodle) {
        return Api().delete('noodle/' + noodle.id, noodle)
    },
}