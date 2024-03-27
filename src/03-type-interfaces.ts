// Type Aliases
type X = number;
type Y = number;

// Tuple Type
type Dimensions = [X, Y];

// Type Union
type VideoTypes =
    | { extension: 'mp4'; mimeType: 'video/mp4' }
    | { extension: 'webm'; mimeType: 'video/webm' }
    | { extension: 'avi'; mimeType: 'video/x-msvideo' };

// Type Intersection
type Video = VideoTypes & {
    resolution: Dimensions;
    fileSize: number;
    download(): void;
};

const video: Video = {
    extension: 'mp4',
    mimeType: 'video/mp4',
    resolution: [200, 400],
    fileSize: 400,
    download: () => false
};

interface Shape {
    calculateArea(): number;
}

class Square implements Shape {
    private width: number;

    public constructor(width: number) {
        this.width = width;
    }

    public calculateArea() {
        return 0;
    }
}

const square = new Square(5);

class Circle implements Shape {
    calculateArea() {
        return 0;
    }
}
