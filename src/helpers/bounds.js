import L from 'leaflet';
import Clipper from 'js-clipper';

export default class Bounds {
  loadedBounds = [];

  /**
   * Add bounds to the list of loaded bounds
   * @param {L.Bounds} bounds
   */
  add(bounds) {
    this.loadedBounds.push(bounds);
  }

  /**
   * Return the list of the loaded bounds
   * @return {L.Bounds[]}
   */
  get() {
    return [...this.loadedBounds];
  }

  /**
   * Clear the loaded bounds list
   */
  clear() {
    this.loadedBounds = [];
  }

  /**
   * Tells if a bounds area is already loaded
   * @param {L.Bounds} bounds
   * @return {boolean}
   */
  areFullyLoaded(bounds) {
    if (this.loadedBounds.length === 0) {
      return false;
    }

    const subjectClips = Bounds.buildClipsFromBoundsList([bounds]);
    const knownClips = Bounds.buildClipsFromBoundsList(this.loadedBounds);
    const clipper = new Clipper.Clipper();
    const solutionPolyTree = new Clipper.PolyTree();

    clipper.AddPaths(subjectClips, Clipper.PolyType.ptSubject, true);
    clipper.AddPaths(knownClips, Clipper.PolyType.ptClip, true);

    clipper.Execute(
      Clipper.ClipType.ctDifference,
      solutionPolyTree,
      Clipper.PolyFillType.pftNonZero,
      Clipper.PolyFillType.pftNonZero
    );

    const solutionExPolygons = Clipper.JS.PolyTreeToExPolygons(
      solutionPolyTree
    );

    if (solutionExPolygons.length === 0) {
      return true;
    }

    return false;
  }

  /**
   * Convert a bounds area into a clip
   * @static
   * @param {L.Bounds} bounds
   * @return {{X: number, Y: number}[]}
   */
  static buildClipsFromBoundsList(bounds) {
    return bounds.map(bound => [
      {
        X: bound._southWest.lng * 1000000,
        Y: bound._southWest.lat * 1000000
      },
      {
        X: bound._southWest.lng * 1000000,
        Y: bound._northEast.lat * 1000000
      },
      {
        X: bound._northEast.lng * 1000000,
        Y: bound._northEast.lat * 1000000
      },
      {
        X: bound._northEast.lng * 1000000,
        Y: bound._southWest.lat * 1000000
      }
    ]);
  }

  /**
   * Convert a clip into a bounds area
   * @static
   * @param {{X: number, Y: number}[]} clips
   * @return {L.Bounds}
   */
  static buildBoundsListFromClips(clips) {
    return clips.map(clip =>
      L.latLngBounds(
        L.latLng(clip[0].Y / 1000000, clip[0].X / 1000000).wrap(),
        L.latLng(clip[2].Y / 1000000, clip[2].X / 1000000).wrap()
      )
    );
  }
}
