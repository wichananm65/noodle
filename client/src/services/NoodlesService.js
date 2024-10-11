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
    put(noodles) {
        return Api().put('noodle/' + noodles.id, noodle)
    },
    delete(noodles) {
        return Api().delete('noodle/' + noodles.id, noodle)
    },
}