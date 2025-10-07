class LegendItem {
    constructor(title: any, color: any, isFor: any, textColor: any){
        this.title = title
        this.color = color
        this.isFor = isFor
        this.textColor = textColor != null ? textColor : 'black'
    }
}

export default LegendItem