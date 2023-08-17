import { AppComponent } from './../app.component';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "defaultImage"
})
export class DefaultImagePipe implements PipeTransform {
  transform(imagePath: string): string {
    return imagePath === "N/A" ? "../../../assets/imagens/produto sem imagem.png" : imagePath;
  }
}
