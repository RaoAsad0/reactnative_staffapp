import { StyleSheet, Text, View,FlatList, TouchableOpacity} from 'react-native';
import { color } from '../color/color';

const CheckInAllPopup = ({ticketslist}) => {

    const renderItem = ({ item }) => (
        <View style={styles.ticketContainer}>
        <View>
            <Text style={styles.ticketheading}>Ticket ID</Text>
            <Text style={styles.ticketId}>{item.id}</Text>
            <Text style={styles.ticketType}>{item.type}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.priceCurrency}>USD</Text>
                <Text style={styles.ticketPrice}>{item.price}</Text>
            </View>
        </View>
        <View style={styles.statusAndDateContainer}>
            <TouchableOpacity style={styles.statusButton}>
                <Text style={styles.statusButtonText}>{item.status}</Text>
            </TouchableOpacity>
            <Text style={styles.ticketDateheading}>Date</Text>
            <Text style={styles.ticketDate}>{item.date}</Text>
        </View>
    </View>
    );

    return (
        <FlatList
                data={ticketslist}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
    );
};

const styles = StyleSheet.create({
    ticketContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.white_FFFFFF,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: color.white_FFFFFF,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    ticketId: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 14,
        color: color.black_2F251D
    },
    ticketType: {
        fontSize: 14,
        marginTop: 10,
        color: color.black_2F251D,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    priceCurrency: {
        color: color.black_544B45,
    },
    ticketPrice: {
        color: color.brown_5A2F0E,
        fontWeight: 'bold',
    },
    ticketDate: {
        fontSize: 16,
        color: color.black_544B45,
        fontWeight: 'bold',
        marginTop: 10,
    },
    ticketheading: {
        fontSize: 14,
        color: color.black_544B45,
    },
    ticketDateheading: {
        fontSize: 16,
        marginTop: 20,
    },
    statusAndDateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    statusButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        backgroundColor: '#AE6F28',
        marginBottom: 10,
    },
    statusButtonText: {
        color: '#FFF6DF',
    },
});

export default CheckInAllPopup;