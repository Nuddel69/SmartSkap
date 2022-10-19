import math
import serial

class Skap:
    def __init__(self, camera, motorControlPort, boxes, boxesHeight) -> None:
        self._camera = camera;
        self._motorControlPort = motorControlPort;
        self._boxes = boxes;
        self._height = boxesHeight;

    def calculatePath(self, request):
        '''
        Finner korteste bane mellom et sett med bokser
        '''
        
        # Finner antall bokser som må hentes
        points = len(request);
        x = [];
        y = [];

        # Oversetter fra en liste-indeks til x- og y-kordinater
        for i in range(0, points):
            x.append(request[i] % self._height);
            y.append(int(request[i] / self._height) + 1);

        vectors = {};
        for i in range(points):
            vectors[i] = [x[i], y[i]];

        print(vectors);

        #vectors = {1: [x[0], y[0]], 2: [x[1], y[1]], 3: [x[2], y[2]], 4: [x[3], y[3]]};

        # Definerer kordinatene til boksene
        a = [x[0], y[0]];
        b = [x[1], y[1]];
        c = [x[2], y[2]];
        d = [x[3], y[3]];
        print(a,b,c,d);

        # Finner lengden på en vektor mellom to og to forskjellige bokser
        ab = (math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2));
        print(ab);
        ac = (math.sqrt((c[0] - a[0])**2 + (c[1] - a[1])**2));
        print(ac);
        ad = (math.sqrt((d[0] - a[0])**2 + (d[1] - a[1])**2));
        print(ad)
        bc = (math.sqrt((c[0] - b[0])**2 + (c[1] - b[1])**2));
        print(bc);
        bd = (math.sqrt((d[0] - b[0])**2 + (d[1] - b[1])**2));
        print(bd);
        cd = (math.sqrt((d[0] - c[0])**2 + (d[1] - c[1])**2));
        print(cd);
        
        # Returnerer tre forskjellige baner
        return (ac + cd + bd + ab), (ad + bd + bc + ac);

    def setPath(self, request):
        pass

    def move(self, path):
        pass

    def push(self):
        pass

class Camera:
    def __init__(self, camPort, QR_Index) -> None:
        '''
        Et kamera objekt som tar atributtene camPort og QR_Index, der camPort er den serielle porten kameraet er koblet til, og QR_index er en ordbok som knytter hver QR kode opp mot en boks
        '''

        self._camPort = camPort;
        self._QR_Index = QR_Index;

    def scan(self):
        pass

    def readQR(self):
        pass

    def cameraToggle(self):
        pass


# Definerer høyden på matrisen
mapHeight = 6;

# Selve systemet boksene befinner seg i
skapBokser_6x6 = [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
];

# En vilkårlig bestilling på fire bokser
request4x4 = [2, 13, 14, 32];

# Lage objektene som brukes
kameraOBJ = Camera(1, [1]);
skapOBJ = Skap(kameraOBJ, 2, skapBokser_6x6, mapHeight);

# Printe lengden på de fire forskjellige banene
print(skapOBJ.calculatePath(request4x4));