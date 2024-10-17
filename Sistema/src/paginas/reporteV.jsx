import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, Document, Page } from "@react-pdf/renderer";
import logoSenaNaranja from "../logoSenaNaranja.png";
import axios from "axios";

const styles = StyleSheet.create({
    page:{
        padding: '20px',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        padding: '10px'
    },
    logo: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '3px',
        margin: 'auto'
    },
    section: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        flexDirection: 'column'
    },
    text: {
        fontSize: '11px',
        padding: '5px',
        textAlign: 'center'
    },
    table: {
        width: '80%',
        margin: '10rem auto',
        padding: '5px',
        fontSize: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    row:{
        flexDirection: 'row',
        borderBottom: '1px solid #ccc',
        marginTop: '5px',
        padding: '10px'
    },
    header:{
        width: '20%',
        textAlign: 'center',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'royalblue'
    },
    cell: {
        width: '20%',
        textAlign: 'center', 
        color: '#222'
    },
    containerText: {
        width: '400px'
    }
});
export default function ReporteV() {
    const url = "http://localhost:3001/Personas_visitante";
    const [personasVisitante, setPersonasVisitante] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPersonasV = async () => {
            try {
                const respuesta = await axios.get(url);
                setPersonasVisitante(respuesta.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        getPersonasV();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={styles.section}>
                    <Image src={logoSenaNaranja} style={styles.logo} />
                </View>
                <View style={styles.containerText}>
                    <Text>Registros de elementos ingresados por visitantes en el año 2024</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.header}>
                            <Text>Nombres</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>Apellidos</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>No Documento</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>Tipo elemento</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>Cantidad</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>Serial</Text>
                        </View>
                    </View>
                    {personasVisitante.map((persona) => (
                        <View key={persona.id} style={styles.row}>
                            <View style={styles.cell}>
                                <Text>{persona.nombres}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>{persona.apellidos}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>{persona.numeroDocumento}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>{persona.tipoElemento}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>{persona.cantidad}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>{persona.serial}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
